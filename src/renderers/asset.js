const renderer = require('ai-renderer-maxdome');

module.exports = (request, response, { asset }) => {
  const pageStart = request.session.pageStart || 1;
  if (asset) {
    response.say = renderer({ asset }, ['typedTitle', 'genres']);
    response.display = {
      title: asset.title,
      text: asset.description,
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
