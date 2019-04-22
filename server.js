'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
const multer = require('multer');
const upload = multer();
var dns = require('dns');
var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())


app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
var array = [];
// adding url endpoint
app.post("/api/shorturl/new", upload.none(),function (req, res) {
  dns.lookup(req.body.url, function onLookup(err, addresses, family) { 
    if(err)
    {
       res.json({"error": "invalid URL"});
       console.log(err)
    }
    
    else 
    {
      
  res.json({"original_url": req.body.url, "short_url": array.length});
  array.push({"original_url": req.body.url, "short_url": array.length});
    }
   }); 


});
// Getting the original url form the shorturl
app.get("/api/shorturl/:id", function (req,res){
  const original_url = array[req.params["id"]];
  const url = original_url["original_url"];
  console.log(url);
  res.redirect("https://" + url);

});


app.listen(port, function () {
  console.log('Node.js listening ...');
});