const unirest = require('unirest');

module.exports = (url) => {
  return new Promise((res, rej) => {
    unirest
      .get(url)
      .then((response) => {
        res(response.body)
      })
      .catch((e) => {
        rej(e.message);
      });
  });
}