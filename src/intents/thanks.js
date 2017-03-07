module.exports = async (request, response) => {
  response.say = 'Be welcome';
  response.finishSession = true;
};
