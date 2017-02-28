require('dotenv').config({ silent: true });

const app = require('express')();
app.listen(process.env.PORT);

const maxdome = require('drequest-maxdome').getRequestBuilder();

app.post('/', require('body-parser').json(), async (req, res) => {
  const json = req.body;
  const request = {
    params: json.params,
  };
  const response = {
    render: (renderer, data) => {
      require(`./renderers/${renderer}`)(request, response, data);
    },
  };
  await require(`./intents/${json.intent}`)(request, response, { maxdome });
  res.send(response);
});
