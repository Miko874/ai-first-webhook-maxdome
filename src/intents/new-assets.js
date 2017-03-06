const _ = require('lodash');
const { AssetsQueryOptions } = require('drequest-maxdome');

module.exports = async (request, response, { maxdome }) => {
  const assetsQueryOptions =
    new AssetsQueryOptions()
      .addFilter('new')
      .addFilter('contentTypeSeriesOrMovies')
      .addQuery('pageSize', 1)
      .addSort('activeLicenseStart', 'desc');
  if (_.has(request, 'params.genre')) {
    assetsQueryOptions.addFilter('genre', _.get(request, 'params.genre'));
  }
  const asset = (await maxdome.request('assets').send(assetsQueryOptions))[0];
  response.render('asset', { asset });
};
