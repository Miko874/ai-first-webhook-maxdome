require('dotenv-safe').config();

const i18n = require('i18n');
i18n.configure({
  directory: `${__dirname}/../locales`,
  updateFiles: false,
  locales: ['en', 'de'],
});

require('dcontrollers')(
  require('dexpress')(),
  [
    require('./controller')({
      i18n,
      maxdome: require('drequest-maxdome').getRequestBuilder(),
      secret: process.env.AI_WEBHOOK_SECRET,
    }),
  ]
);
