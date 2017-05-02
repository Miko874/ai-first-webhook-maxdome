const _ = require('lodash');
const Request = require('drequest').Request;

module.exports = ({ i18n, maxdome, secret }) =>
  ['post', ['/', require('body-parser').json(), async (req, res) => {
    const request = req.body;
    request.linkedAccount = () => {
      const accessToken = request.user.accessToken;
      if (!accessToken) {
        return;
      }
      return new Request().post(process.env.AI_OAUTH_URL, { body: { accessToken } });
    };
    const response = {
      render: (renderer, data) => {
        require(`./renderers/${renderer}`)(request, response, data);
      },
    };
    let error;
    try {
      if (secret && req.headers.secret !== secret) {
        throw new Error(`incorrect secret '${req.headers.secret}'`);
      }
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
      error = e.message;
      response.say = 'Something went wrong, please try again later';
    }
    const paths = [
      'say',
      'display.title',
      'display.text',
    ];
    const language = _.get(request, 'locale', 'en').substr(0, 2);
    for (const path of paths) {
      const value = _.get(response, path);
      if (value) {
        if (Array.isArray(value)) {
          _.set(response, path, i18n.__({ phrase: value[0], locale: language }, value[1]));
        } else {
          _.set(response, path, i18n.__({ phrase: value, locale: language }));
        }
      }
    }
    delete response.render;
    if (error) {
      console.error(JSON.stringify({ error, request, response }));
    } else {
      console.log(JSON.stringify({ request, response }));
    }
    res.send(response);
  }]];
