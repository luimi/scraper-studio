const express = require('express')
const path = require('path');
const vm = require('vm');
const cheerio = require('cheerio')
require('dotenv').config()
const app = express()
app.use(express.urlencoded({ extended: true, limit : '50mb' }));
app.use(express.json({limit: '50mb'}));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
})

/*

           _____ _____ 
     /\   |  __ \_   _|
    /  \  | |__) || |  
   / /\ \ |  ___/ | |  
  / ____ \| |    _| |_ 
 /_/    \_\_|   |_____|
                       
                       

*/

const axios = require("./controllers/axios")
const methods = {
    axios: axios
}
app.get('/methods', (req, res) => {
    res.send(Object.keys(methods))
})

app.post('/scrape', async (req, res) => {
    if (!req.body.method || !req.body.url) {
        res.status(400).send("Missing parameters, method and url required")
        return
    }
    res.send(await methods[req.body.method](req.body.url))
})

app.post('/extract', (req, res) => {
    if (!req.body.code || !req.body.html) {
        res.status(400).send("Missing parameters, code and html required")
        return
    }
    let $ = cheerio.load(req.body.html)
    const params = {
        '$': $,
    }
    const script = new vm.Script(req.body.code)
    const context = new vm.createContext(params)
    try {
        script.runInContext(context);
    }catch(e){
        res.status(400).send(e.message)
        return
    }
    
    res.send(params.result || {})
})

app.listen(process.env.PORT)