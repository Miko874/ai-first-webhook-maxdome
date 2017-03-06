module.exports = async (request, response) => {
  const pageStart = request.session.pageStart;
  if (!pageStart) {
    response.say = 'This intent does not support pagination';
    return;
  }
  response.session.pageStart = pageStart + 1;
  return true;
};
