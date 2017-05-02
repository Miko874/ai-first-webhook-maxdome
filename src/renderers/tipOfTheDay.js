module.exports = (request, response, { tipOfTheDay }) => {
  if (!tipOfTheDay || !tipOfTheDay.review) {
    response.say = 'No tip of the day available';
    return;
  }

  const review = tipOfTheDay.review;
  const asset = review.asset;
  const maxpert = review.maxpert;

  const title = [
    'Todays tip of the day come from {{firstname}} {{surname}}: {{title}}, {{headline}}',
    {
      firstname: maxpert.firstname,
      surname: maxpert.surname,
      title: asset.title,
      headline: review.headline,
    }
  ];

  response.say = title;
  response.display = {
    title,
    text: asset.description,
  };
  response.session.assetId = asset.id;
};
