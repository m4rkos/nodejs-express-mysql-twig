const express = require('express');
const {twig} = require( 'twig' );

const os = require('os')

let consign = require('consign');

const app = express()

app.set('view engine', 'twig');
app.set("twig options", {
    allow_async: true, // Allow asynchronous compiling
    strict_variables: false
});

app.set('views', './src/views');
app.use(express.json());
app.use(express.static('./src/public'));

console.log(os.hostname());

// HTTPS
if(os.hostname() != process.env.ENV_DEV1 && os.hostname() != process.env.ENV_DEV2){
    app.get('*', (req, res, next) => {
        if (req.headers['x-forwarded-proto'] != 'https') {
            res.redirect("https://" + req.headers.host + req.url);        
        } else {
            next();
        }
    });
}

consign()
    .include('src/routes')    
    .then('src/models')
    .then('src/controllers')
    .into(app);

app.use(function (req, res, next){
    res.status(404).send("404");
    //res.status(404).render("404");
});

module.exports = app;