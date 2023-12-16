const fetch = require('node-fetch');

module.exports = (url) => {
  return new Promise((res, rej) => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.text()
        }
      })
      .then((data) => {
        res(data)
      })
      .catch(error => {
        rej(error)
      });
  });
}