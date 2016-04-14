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


app.get('/api', controllers.api.index);
//event route
app.get('/api/events', controllers.events.index);
app.get('/api/events/:eventId', controllers.events.show);
app.post('/api/events', controllers.events.create);
app.delete('/api/events/:eventId', controllers.events.destroy);
app.put('/api/events/:eventId', controllers.events.update);
//fighter route
app.get('/api/fighters', controllers.fighters.index);
app.get('/api/fighters/:fighterId', controllers.fighters.show);
app.post('/api/fighters', controllers.fighters.create);
app.delete('/api/fighters/:fighterId', controllers.fighters.destroy);
app.put('/api/fighters/:fighterId', controllers.fighters.update);
app.post('/api/fighters/:fighterId/events', controllers.fightersEvents.create);
//judge route
app.get('/api/judges', controllers.judges.index);
app.get('/api/judges/:judgeId', controllers.judges.show);
app.post('/api/judges', controllers.judges.create);
app.delete('/api/judges/:judgeId', controllers.judges.destroy);
app.put('/api/judges/:judgeId', controllers.judges.update);
//referee route
app.get('/api/referees', controllers.referees.index);
app.get('/api/referees/:refereeId', controllers.referees.show);
app.post('/api/referees', controllers.referees.create);
app.delete('/api/referees/:refereeId', controllers.referees.destroy);
app.put('/api/referees/:refereeId', controllers.referees.update);
//ScoreCard route
app.get('/api/scoreCards', controllers.scoreCards.index);
app.get('/api/scoreCards/:scoreCardId', controllers.scoreCards.show);
app.post('/api/scoreCards', controllers.scoreCards.create);
app.delete('/api/scoreCards/:scoreCardId', controllers.scoreCards.destroy);
app.put('/api/scoreCards/:scoreCardId', controllers.scoreCards.update);

//get all fighters
app.get('/api/fighters', function (req, res) {
  // send all fighters as JSON response
  db.ScoreCard.find().populate('ScoreCard').exec(function(err, fighter) {
      if (err) { return console.log("index error: " + err); }
      res.json(fighter);
  });
});

// get one fighter
app.get('/api/fighters/:id', function (req, res) {
  db.ScoreCard.findOne({_id: req.params._id }, function(err, data) {
    res.json(data);
  });
});

// delete fighter
app.delete('/api/fighters/:id', function (req, res) {
  // get fighter id from url params (`req.params`)
  console.log('fighters delete', req.params);
  var fighterId = req.params.id;
  // find the index of the fighter we want to remove
  db.ScoreCard.findOneAndRemove({ _id: fighterId }, function (err, fighter) {
    res.json(fighter);
  });
});

// create new book
app.post('/api/fighters', function (req, res) {
  // create new book with form data (`req.body`)
  var newScoreCard = new db.ScoreCard({
    event1: req.body.event1,
    event2: req.body.event2,
    event1Score: req.body.event1Score,
    event2Score: req.body.event2Score,
  });

// find the author from req.body
db.Fighter.findOne({first_name: req.body.event}, function(err, foundFighter){
  if (err) {
    res.status(500).send(err);
    return console.log(err);
  }
  // add this author to the book
  newScoreCard.event = event;

  // save newBook to database
  newScoreCard.save(function(err, savedScoreCard){
    if (err) {
      res.status(500).send(err);
      return console.log("save error: " + err);
    }
      console.log("saved ", fighter.title);
      // send back the book!
      res.json(savedScoreCard);
    });
  });
});

app.get('/api/events/:id', function (req, res) {
  db.Fighter.findOne({_id: req.params._id }, function(err, data) {
    res.json(data);
  });
});

// create new event
app.post('/api/events', function (req, res) {
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
  newFighter.save(function(err, event){
    if (err) {
      return console.log("save error: " + err);
    }
      console.log("saved ", event.title);
      // send back the book!
      res.json(event);
    });
  });
});


app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening at http://localhost:3000/');
});
