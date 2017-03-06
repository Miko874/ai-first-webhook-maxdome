require('dotenv').config({ silent: true });

const app = require('express')();
app.listen(process.env.PORT);

const maxdome = require('drequest-maxdome').getRequestBuilder();

app.post('/', require('body-parser').json(), async (req, res) => {
  const request = req.body;
  const response = {
    render: (renderer, data) => {
      require(`./renderers/${renderer}`)(request, response, data);
    },
  };
  try {
    if (typeof request !== 'object') {
      throw new Error('request must be an object');
    }
    request.session = request.session || {};
    if (typeof request.session !== 'object') {
      throw new Error('request.session must be an object');
    }
    response.session = request.session;
    let intent = request;
    while (intent) {
      request.name = intent.name;
      if (!request.name) {
        throw new Error('missing name');
      }
      request.params = intent.params || {};
      if (typeof request.params !== 'object') {
        throw new Error('request.params must be an object');
      }
      intent = false;
      try {
        if (await require(`./actions/${request.name}`)(request, response, { maxdome })) {
          intent = request.session.intent;
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
  res.send(response);
});
