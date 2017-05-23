const { AssetsQueryOptions } = require('@dnode/request-maxdome');

module.exports = async (request, response, { maxdome }) => {
  if (!request.params.search) {
    throw new Error('missing parameter "search"');
  }
  const assetsQueryOptions = new AssetsQueryOptions()
    .addFilter('contentTypeSeriesOrMovies')
    .addFilter('search', request.params.search)
    .addQuery('pageSize', 1)
    .addQuery('pageStart', request.session.pageStart || 1);
  const asset = (await maxdome.request('assets').send(assetsQueryOptions))[0];
  response.render('asset', { asset });
};
