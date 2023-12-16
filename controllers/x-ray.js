var Xray = require('x-ray');
var x = Xray();

module.exports = (url) => {
    return new Promise((res, rej) => {
        x(url, 'body@html')((err, html) => {
            if (err) rej(err)
            else res(html)
        });
    });
}