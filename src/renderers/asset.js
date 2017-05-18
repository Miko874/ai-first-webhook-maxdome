const renderer = require('ai-renderer-maxdome');

module.exports = (request, response, { asset }) => {
  const pageStart = request.session.pageStart || 1;
  if (asset) {
    response.say = renderer(
      { asset },
      ['typedTitle', 'genres'],
      request.language
    );
    response.display = {
      title: renderer({ asset }, ['typedTitle'], request.language),
      text: renderer({ asset }, ['description'], request.language),
    };
    response.session.assetId = asset.id;
    response.session.pageStart = pageStart;
  } else {
    if (pageStart > 1) {
      response.say = 'No more assets available';
      response.session.pageStart = pageStart - 1;
    } else {
      response.say = 'No assets available';
    }
  }
};
