module.exports = async (request, response, { maxdome }) => {
  const tipOfTheDay = (await maxdome.request('tipofthedays').send())[0];
  response.render('tipoftheday', { tipOfTheDay });
};
