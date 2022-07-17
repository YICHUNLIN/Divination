require('dotenv').config();
require('./extensions');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();

app.use(logger('dev'));
app.use(cookieParser());


// v1
require('./routes/v1')(app, 
    [   cors(),
        express.json(), 
        express.urlencoded({ extended: false }), 
        cookieParser(),
        (req, res, next) => {
            //req.logger = logger;
            next();
        }
    ]
);

module.exports = app;