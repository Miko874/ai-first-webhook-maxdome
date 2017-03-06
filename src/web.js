require('dotenv').config({ silent: true });
const _ = require('lodash');

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
    const name = _.get(request, 'name');
    if (!name) {
      throw new Error('missing name');
    }
    let module;
    try {
      module = require(`./actions/${name}`);
    } catch (e) {
      if (e.code !== 'MODULE_NOT_FOUND') {
        throw e;
      }
      module = require(`./intents/${name}`);
    }
    await module(request, response, { maxdome });
  } catch (e) {
    console.log(e);
    response.say = 'Something went wrong, please try again later';
  }
  res.send(response);
});
