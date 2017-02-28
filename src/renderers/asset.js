module.exports = (request, response, { asset }) => {
  response.say = asset.title;
  response.display = {
    title: asset.title,
    text: asset.description,
  };
};
