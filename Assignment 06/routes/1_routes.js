// express
const express = require('express');
const router = express.Router();

// fs
const fs = require('fs');

// path
const path = require('path');

// querystring
const querystring = require('query-string');

// assert
const assert = require('assert')

// multer
const multer = require ('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage});

// mongoDB
const mongodb = require('mongodb');
const { URLSearchParams } = require('url');
const { start } = require('repl');
const MongoClient = mongodb.MongoClient
const url = 'mongodb://localhost:27017' // connection URL
const client = new MongoClient(url) // mongodb client
const dbName = 'Exercise06DB' // database name
const collectionName = 'routes' // collection name


/**
 * GET route listing.
 * Connects to the mongoDB and finds all the routes stored in the used collection, renders the pug view
 * and sends information to the pug-view where they get displayed as options in select tag.
 * 
 *  */ 
router.get('/', function(req, res, next) {

  // connect to the mongodb database and retrieve all routes
  client.connect(function(err)
  {
    assert.equal(null, err);

    console.log('Connected successfully to server');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // find some documents
    collection.find({}).toArray(function(err, data)
    {
      assert.equal(err, null);
      console.log('Found the following records...');
      console.log(data);
      res.render('1_routes', {title: 'Available Routes:', routes: data});
    })
  })
});


/**
 * POST selected Route to the file system.
 * Uses the information sent by the client to change the route selected for the clientside leaflet map.
 * Therefore the fs overwrites the file which is used for the initialization of the all the map-functions.
 * and redirects to the homepage, so that the map is initialized with the selected route.
 * The route is queried from the mongoDB collection and used paresed to string afterwards so that
 * it can be used to overwrite the current routeDB.geojson
 * 
 */
router.post('/selectRoute', function(req, res) {
  const postObj = req.body;
  console.log(postObj.id);

  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  // find some documents
  var myfilter = {"_id": mongodb.ObjectId(postObj.id)};
  console.log(myfilter);
  
  collection.find(myfilter).toArray(function(err, data)
  {
    assert.equal(err, null);
    console.log(data[0]);
    var routeJSONString = JSON.stringify(data[0]);

    var filepath = path.resolve(__dirname, '../public/geojson/routeDB.geojson');

    fs.writeFile(filepath, `var routeDB = ${routeJSONString}`, function(err) {
      if (err) throw err;
      console.log('Replaced');
    })
    res.redirect('/');
  });
})

module.exports = router;