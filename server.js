// server.js

    // set up
    var express = require('express');
    var app = express();                   // create our app w/ express
    var mongoose = require('mongoose');          // mongoose for mongodb
    var port = process.env.PORT || 8080;         // set the port
    var database = require('./config/database')  // load the database config
    var morgan = require('morgan');              // log requests to the console (express4)
    var bodyParser = require('body-parser');     // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


    // config
    mongoose.connect(database.url);   // connect to mongoDB database

    app.use(express.static(__dirname + '/public'));
    app.use(morgan('dev'));
    app.use(bodyParser.urlencoded({'extended':'true'}));
    app.use(bodyParser.json());
    app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
    app.use(methodOverride());

    // routes
    require('./app/routes.js')(app);

    // listen (start app with node server.js)
    app.listen(port);
    console.log("App listening on port" + port);
