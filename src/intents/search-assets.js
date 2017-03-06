const _ = require('lodash');
const { AssetsQueryOptions } = require('drequest-maxdome');

module.exports = async (request, response, { maxdome }) => {
  const assetsQueryOptions =
    new AssetsQueryOptions()
      .addFilter('contentTypeSeriesOrMovies')
      .addQuery('pageSize', 1);
      .addFilter('search', _.get(request, 'params.search'))
  const asset = (await maxdome.request('assets').send(assetsQueryOptions))[0];
  response.render('asset', { asset });
};
