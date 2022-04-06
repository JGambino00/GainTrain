const express = require('express')
const app = express()
const path = require('path');
const bodyParser = require('body-parser')
//const cors = require('cors');
require('dotenv').config();

var cookieParser = require('cookie-parser');

const UserController = require("./Controllers/UserController");

app.use(UserController);


app.use(express.json());
app.use(cookieParser());
//Comment this out?
//app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.static(path.join(__dirname, "../client/build")));
app.use(express.static(__dirname + "../client/public/"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(express.static('dist'));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://primal-graph-346315.nn.r.appspot.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//LEAVE THIS HERE
// app.get('/*', function(req,res){
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
// });


module.exports = app;