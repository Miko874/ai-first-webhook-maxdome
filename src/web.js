require('dotenv').config({ silent: true });

const app = require('express')();
app.listen(process.env.PORT);

const maxdome = require('drequest-maxdome').getRequestBuilder();

app.post('/', require('body-parser').json(), async (req, res) => {
  const request = req.body;
  const id = request.id;
  console.log(`id: ${id}`);
  console.log(`(${id}) request: ${request}`);
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
  console.log(`(${id}) response: ${response}`);
  res.send(response);
});
