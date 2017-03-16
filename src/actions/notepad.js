const SessionOptions = require('drequest-maxdome').SessionOptions;

module.exports = ({ maxdome }) => async (request, response) => {
  const assetId = request.session.assetId;
  if (!assetId) {
    response.say = 'No asset in the current session';
    return;
  }
  const linkedAccount = await request.linkedAccount();
  if (!linkedAccount) {
    response.say = 'Account not linked with a maxdome user';
    response.requireAccessToken = true;
    return;
  }
  await maxdome.post('v1/mxd/notepad/%customerId%', [
    { body: { contentId: assetId } },
    new SessionOptions(linkedAccount)
  ]);
  response.say = 'Ok';
};
