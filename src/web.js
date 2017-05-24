require('dotenv-safe').config();

const app = require('express')();
app.disable('x-powered-by');

require('@dnode/middlewares')(app, [require('body-parser').json()]);

const i18n = require('i18n');
i18n.configure({
  directory: `${__dirname}/../locales`,
  updateFiles: false,
  locales: ['en', 'de'],
});
const maxdome = require('@dnode/request-maxdome').getRequestBuilder();

require('@dnode/controllers')(app, [
  require('./controller')({ i18n, maxdome }),
]);

if (module.parent) {
  module.exports = app;
} else {
  app.listen(process.env.PORT);
}
