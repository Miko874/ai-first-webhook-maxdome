const _ = require('lodash');
const { Request } = require('@dnode/request');

module.exports = ({ i18n, maxdome }) => [
  'post',
  [
    '/',
    async (req, res) => {
      const request = req.body;
      request.language = _.get(request, 'locale', 'de').substr(0, 2);
      request.linkedAccount = async () => {
        const accessToken = request.user.accessToken;
        if (!accessToken) {
          return;
        }
        const data = await new Request().post(process.env.AI_OAUTH_URL, {
          body: { accessToken },
        });
        return data.linkedAccount;
      };
      request.params = request.params || {};
      request.session = request.session || {};
      const response = {
        render: (renderer, data) => {
          require(`./renderers/${renderer}`)(request, response, data);
        },
      };
      let error;
      try {
        response.session = request.session;
        let run = true;
        while (run) {
          run = false;
          try {
            if (
              await require(`./actions/${request.name}`)(request, response, {
                maxdome,
              })
            ) {
              run = true;
              request.name = request.session.intent.name;
              request.params = request.session.intent.params;
            }
          } catch (e) {
            if (e.code !== 'MODULE_NOT_FOUND') {
              throw e;
            }
            await require(`./intents/${request.name}`)(request, response, {
              maxdome,
            });
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
      const paths = ['say', 'display.title', 'display.text'];
      for (const path of paths) {
        const value = _.get(response, path);
        if (value) {
          if (Array.isArray(value)) {
            _.set(
              response,
              path,
              i18n.__({ phrase: value[0], locale: request.language }, value[1])
            );
          } else {
            _.set(
              response,
              path,
              i18n.__({ phrase: value, locale: request.language })
            );
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
    },
  ],
];
