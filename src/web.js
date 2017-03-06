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
    await require(`./intents/${request.intent}`)(request, response, { maxdome });
  } catch (e) {
    console.log(e);
    response.say = 'Something went wrong, please try again later';
  }
  res.send(response);
});
