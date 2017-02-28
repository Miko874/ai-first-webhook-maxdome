const { AssetsQueryOptions } = require('drequest-maxdome');

module.exports = async (request, response, { maxdome }) => {
  const assetsQueryOptions =
    new AssetsQueryOptions()
      .addFilter('contentTypeSeriesOrMovies')
      .addFilter('search', request.params.search)
      .addQuery('pageSize', 1);
  const asset = (await maxdome.request('assets').send(assetsQueryOptions))[0];
  response.render('asset', { asset });
};
