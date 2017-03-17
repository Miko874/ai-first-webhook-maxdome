module.exports = async (request, response, { maxdome }) => {
  const tipOfTheDay = (await maxdome.request('tipOfTheDays').send())[0];
  response.render('tipOfTheDay', { tipOfTheDay });
};
