require('dotenv-safe').config();

const app = require('dexpress')();

require('dmiddlewares')(app, [
  require('body-parser').json(),
]);

const i18n = require('i18n');
i18n.configure({
  directory: `${__dirname}/../locales`,
  updateFiles: false,
  locales: ['en', 'de'],
});

require('dcontrollers')(app, [
  require('./controller')({
    i18n,
    maxdome: require('drequest-maxdome').getRequestBuilder(),
  }),
]);
