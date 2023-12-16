const axios = require("axios");

module.exports = (url) => {
    return new Promise((res, rej) => {
        axios
          .get(`https://lui2mi-puppeteer.onrender.com/render/${url}`)
          .then((response) => {
            let html = response.data;
            res(html);
          })
          .catch((e) => {
            rej(e.message);
          });
      });
}