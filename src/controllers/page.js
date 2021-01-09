const faker = require('faker')
const dotenv = require('dotenv');
dotenv.config();

let db = require('../../config/database');
let conn = db();

module.exports.about = (app, req, res) =>{    
    let users = [{
        name: faker.name.findName(),
        email: faker.internet.email(),
        avatar: 'http://placebear.com/300/300'
    }, {
        name: faker.name.findName(),
        email: faker.internet.email(),
        avatar: 'http://placebear.com/400/300'
    }, {
        name: faker.name.findName(),
        email: faker.internet.email(),
        avatar: 'http://placebear.com/500/300'
    }]
    
    res.render('pages/about', {
        title: 'About',
        usuarios: users
    })
}

module.exports.home = (app, req, res) =>{

    let connect = conn();    
    connect.on("end", (e) => console.log('DB Done :)'));    

    var apiModel = new app.src.models.page(connect);        

    id = 0;

    apiModel.getAllTables({ id }, (error, result) => {        
        res.render('pages/home', {
            title: 'Home page',
            data: result
        });
    });

    connect.end();
}

module.exports.contact = (app, req, res) =>{
    
    res.render('pages/contact', {
        title:  'Contact',
    })
}
module.exports.contact_post = (app, req, res) =>{

    
    console.log(req.body)
    res.send('Obrigado por entrar em contato conosco, ' + req.body.name + '! Responderemos em breve!')
}