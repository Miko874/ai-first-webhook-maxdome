module.exports = (request, response, { asset }) => {
  const pageStart = request.session.pageStart || 1;
  if (asset) {
    response.say = asset.title;
    response.display = {
      title: asset.title,
      text: asset.description,
    };
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
