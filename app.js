"use strict";

// modules installés 

var util = require('util');
var path = require("path");
var express = require("express");
var bodyParser = require("body-parser");
var morgan = require("morgan");
var serveStatic = require("serve-static");
var _ = require('lodash');
var $ = require('jquery');
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/afpa');

var app = module.exports = express();

//creation du port d'ecoute (ici 3000) et du chemin 
app.enable("trust proxy");
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname,'.', "views"));
app.set("view engine", "ejs");
app.use(morgan("dev"));
app.use(serveStatic(path.join(__dirname,'.', "public")));
app.use(bodyParser.urlencoded({ extended: false }));

// ds route /remontee, on cree une fonction callback qui est 
// appelé lorsque quelqu'un fait appel à cette route
app.get('/remontee', function (req, res) { 
 res.render('remontee',{titre:"remontee1"})
})

app.get('/curseur', function (req, res) { 
 res.render('curseur',{titre:"curseur1"})
})

app.get('/tri', function (req, res) { 
 res.render('tri',{titre:"tri1"})
})

app.get('/vote', function (req, res) { 
 res.render('vote',{titre:"vote1"})
})

app.post('/datas',function(req,res){
  console.log(req.body.saisie);
  var collection = db.get(req.body.nomCollection)
  collection.insert(JSON.parse(req.body.saisie),function(err,doc){
  	if (err) console.log(err) ;
  })
})

app.get('/affiche/:formulaire/:collection',function(req,res){
  // lire la base de donnee
  var collection = db.get(req.params.collection)
   collection.find({},{},function(e,docs){
   	console.log(e)
   	console.log('DOCS',docs)
  		//res.render('curseur',{collection:docs}) 	
   })
  
})
