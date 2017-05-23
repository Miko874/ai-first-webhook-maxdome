const { AssetsQueryOptions } = require('@dnode/request-maxdome');

module.exports = async (request, response, { maxdome }) => {
  const assetsQueryOptions = new AssetsQueryOptions()
    .addFilter('new')
    .addFilter('contentTypeSeriesOrMovies')
    .addQuery('pageSize', 1)
    .addQuery('pageStart', request.session.pageStart || 1)
    .addSort('activeLicenseStart', 'desc');
  if (request.params.genre) {
    assetsQueryOptions.addFilter('genre', request.params.genre);
  }
  const asset = (await maxdome.request('assets').send(assetsQueryOptions))[0];
  response.render('asset', { asset });
};
