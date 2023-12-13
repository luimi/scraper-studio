const axios = require("axios");

module.exports = (url) => {
    return new Promise((res, rej) => {
        axios
          .get(url)
          .then((response) => {
            let html = response.data;
            res(html);
          })
          .catch((e) => {
            rej(e.message);
          });
      });
}