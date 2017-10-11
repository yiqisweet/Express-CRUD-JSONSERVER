

'use strict';

var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var routes = require('./routes/index');
app.use(bodyParser.urlencoded(
    {extended : true})
)


//静态目录
app.use(express.static(path.join(__dirname,'/public')))

//视图引擎
app.engine('html',require('ejs').__express);
app.set('view engine','html');
app.set('views',__dirname+'/views');

// 路由
app.use('/',routes);
app.use('/login',routes);
app.use('/register',routes);
app.use('/delete',routes);
app.use('/update',routes);







server.listen(8060);