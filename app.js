var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
    req.configuration = {
        mockServerUrl: 'https://interview.riskxint.com'
    };

    next();
});

app.use('/', indexRouter);
app.use(apiRouter);

module.exports = app;
