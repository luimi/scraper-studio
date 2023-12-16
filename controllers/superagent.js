const superagent = require('superagent');

module.exports = (url) => {
    return new Promise((res, rej) => {
        superagent.get(url).end((err, html) => {
            if (err) rej(err)
            else res(html.text)
        });
    });
}