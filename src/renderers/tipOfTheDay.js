const renderer = require('@ai-first/renderer-maxdome');

module.exports = (request, response, { tipOfTheDay }) => {
  const review = tipOfTheDay.review;
  if (!review) {
    throw new Error('missing linked review in the tipOfTheDay');
  }
  const asset = review.asset;
  if (!asset) {
    throw new Error('missing linked asset in the review');
  }
  const maxpert = review.maxpert;
  if (!maxpert) {
    throw new Error('missing linked maxpert in the review');
  }
  response.say = renderer(tipOfTheDay, [
    'tipOfTheDay',
    'maxpert',
    'typedTitle',
    'review',
  ]);
  response.display = {
    title: renderer(tipOfTheDay, ['tipOfTheDay', 'typedTitle']),
    text: renderer(tipOfTheDay, ['description']),
  };
  response.session.assetId = asset.id;
};
