require('dotenv').config({ silent: true });
const _ = require('lodash');

const app = require('express')();
app.listen(process.env.PORT);

const i18n = require('i18n');
i18n.configure({
  directory: `${__dirname}/../locales`,
  updateFiles: false,
  locales: ['en', 'de'],
});
const maxdome = require('drequest-maxdome').getRequestBuilder();

app.post('/', require('body-parser').json(), async (req, res) => {
  const request = req.body;
  const id = request.id;
  console.log(`id: ${id}`);
  console.log(`(${id}) request: ${JSON.stringify(request)}`);
  const response = {
    render: (renderer, data) => {
      require(`./renderers/${renderer}`)(request, response, data);
    },
  };
  try {
    response.session = request.session;
    let run = true;
    while (run) {
      run = false;
      try {
        if (await require(`./actions/${request.name}`)(request, response, { maxdome })) {
          run = true;
          request.name = request.session.intent.name;
          request.params = request.session.intent.params;
        }
      } catch (e) {
        if (e.code !== 'MODULE_NOT_FOUND') {
          throw e;
        }
        await require(`./intents/${request.name}`)(request, response, { maxdome });
        response.session.intent = {
          name: request.name,
          params: request.params,
        };
      }
    }
  } catch (e) {
    console.log(e);
    response.say = 'Something went wrong, please try again later';
  }
  const paths = [
    'say',
    'display.title',
    'display.text',
  ];
  for (const path of paths) {
    const value = _.get(response, path);
    if (value) {
      if (Array.isArray(value)) {
        _.set(response, path, i18n.__({ phrase: value[0], locale: request.locale }, value[1]));
      } else {
        _.set(response, path, i18n.__({ phrase: value, locale: request.locale }));
      }
    }
  }
  console.log(`(${id}) response: ${JSON.stringify(response)}`);
  res.send(response);
});
