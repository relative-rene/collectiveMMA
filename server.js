// server.js
// SERVER-SIDE JAVASCRIPT

/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),

    //  NEW ADDITIONS
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));
// future authentication stuff
// app.use(cookieParser());
// app.use(session({
//   secret: 'supersecretkey', // change this!
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());

// Authentication and Authorization stuff step hoover craft
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

////////////////////
//  ROUTES
///////////////////


// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`



// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

//JSON API Endpoints
app.get('/api', function apiIndex(req,res) {
  //TODO: Document all api Endpoints
  res.json({
    message: "Collective MMA api",
    documentation_url:'investigate what documentation url is and update',
    base_url: "https://github.com/relative-rene/project-01",// this may cause issues make sure the url is correct
    endpoints: [
  {method: "GET", path: "/api", description: "Describes all available endpoints"},
  {method: "GET", path: "/api/fighters", description: "retrieves all fighters"},
  {method: "GET", path: "/api/fighters/:id", description: "retrieves specific fighter"},
  {method: "POST", path: "/api/fighters", description: "creating new fighter"},
  {method: "DELETE", path: "/api/fighters/:id", description: "removing specific fighter"},
  {method: "GET", path: "/api/scoreCards", description: "retrieve all scoreCards"},
  {method: "GET", path: "/api/scoreCards/:id", description: "retrieve specific scoreCard"},
  {method: "POST", path: "/api/scoreCards", description: "creating new scoreCard"},
  {method: "DELETE", path: "/api/scoreCards/:id", description: "remove specific scoreCard"},
  // {method: "GET", path: "/api/users", description: "retrieve all users"},
  // {method: "GET", path: "/api/users/:id", description: "retrieve specific user"},
  // {method: "POST", path: "/api/users", description: "create new user"},
  // {method: "DELETE", path: "/api/users/:id", description: "remove specific user"},
  // {method: "GET", path: "/api/judges", description: "retrieve all judges"},
  // {method: "GET", path: "/api/judges/:id", description: "retrieve specific judge"},
  // {method: "POST", path: "/api/judges", description: "creating new judge"},
  // {method: "DELETE", path: "/api/judges/:id", description: "remove specific judge"},
]
  });
});

//get all scoreCards
app.get('/api/scoreCards', function (req, res) {
  // send all scoreCards as JSON response
  db.ScoreCard.find().populate('ScoreCard').exec(function(err, scoreCard) {
      if (err) { return console.log("index error: " + err); }
      res.json(scoreCard);
  });
});

// get one scoreCard
app.get('/api/scoreCards/:id', function (req, res) {
  db.ScoreCard.findOne({_id: req.params._id }, function(err, data) {
    res.json(data);
  });
});

// delete scoreCard
app.delete('/api/scoreCards/:id', function (req, res) {
  // get scoreCard id from url params (`req.params`)
  console.log('scoreCards delete', req.params);
  var scoreCardId = req.params.id;
  // find the index of the scoreCard we want to remove
  db.ScoreCard.findOneAndRemove({ _id: scoreCardId }, function (err, scoreCard) {
    res.json(scoreCard);
  });
});

// create new book
app.post('/api/scoreCards', function (req, res) {
  // create new book with form data (`req.body`)
  var newScoreCard = new db.ScoreCard({
    fighter1: req.body.fighter1,
    fighter2: req.body.fighter2,
    fighter1Score: req.body.fighter1Score,
    fighter2Score: req.body.fighter2Score,
  });

// find the author from req.body
db.Fighter.findOne({first_name: req.body.fighter}, function(err, foundFighter){
  if (err) {
    res.status(500).send(err);
    return console.log(err);
  }
  // add this author to the book
  newScoreCard.fighter = fighter;

  // save newBook to database
  newScoreCard.save(function(err, savedScoreCard){
    if (err) {
      res.status(500).send(err);
      return console.log("save error: " + err);
    }
      console.log("saved ", scoreCard.title);
      // send back the book!
      res.json(savedScoreCard);
    });
  });
});

app.get('/api/fighters/:id', function (req, res) {
  db.Fighter.findOne({_id: req.params._id }, function(err, data) {
    res.json(data);
  });
});

// create new fighter
app.post('/api/fighters', function (req, res) {
  // create new book with form data (`req.body`)
  var newFighter = new db.Fighter({
    first_name: {
      type: String,
      required:true
    },
    last_name:String,
    wins: req.body.wins,
    losses: req.body.losses,
    draws: req.body.draws,
    weight_class: [],
    rookieYear: req.body.proDebut
  });

// find the author from req.body
db.ScoreCard.findOne({name: req.body.scorecard}, function(err, scorecard){
  if (err) {
    return console.log(err);
  }
  // add this author to the book
  newFighter.scorecard = scorecard;

  // save newBook to database
  newFighter.save(function(err, fighter){
    if (err) {
      return console.log("save error: " + err);
    }
      console.log("saved ", fighter.title);
      // send back the book!
      res.json(fighter);
    });
  });
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening at http://localhost:3000/');
});
