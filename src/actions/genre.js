module.exports = async (request, response) => {
  if (!request.session.intent.name === 'newAssets') {
    response.say = 'This intent does not support advanced filtering with genre';
    return;
  }
  request.session.intent.params = { genre: request.params.genre };
  return true;
};
