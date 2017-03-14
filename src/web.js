require('dotenv').config({ silent: true });

const { app } = require('dexpress');

const i18n = require('i18n');
i18n.configure({
  directory: `${__dirname}/../locales`,
  updateFiles: false,
  locales: ['en', 'de'],
});
const maxdome = require('drequest-maxdome').getRequestBuilder();

require('dcontrollers')(app, [
  require('./controller')({ i18n, maxdome }),
]);
