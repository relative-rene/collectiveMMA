// server.js
// SERVER-SIDE JAVASCRIPT

/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    controllers = require('./controllers'),

    //  NEW ADDITIONS
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static(__dirname + '/public'));

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

// app.get('/index', function (req, res) {
//   res.sendFile('views/index.html' , { root : __dirname});
//
// });
app.get('/index', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});
app.get('/fighter', function (req, res) {
  res.sendFile(__dirname + '/views/fighter.html');
});

app.get('/event', function (req, res) {
  res.sendFile(__dirname + '/views/event.html');
});

app.get('/scoreCard', function (req, res) {
  res.sendFile(__dirname + '/views/scoreCard.html');
});

app.get('/prediction', function (req, res) {
  res.sendFile(__dirname + '/views/prediction.html');
});

app.get('/referee', function (req, res) {
  res.sendFile(__dirname + '/views/referee.html');
});

app.get('/judge', function (req, res) {
  res.sendFile(__dirname + '/views/judge.html');
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
app.post('/api/fighters/:fighterId/events', controllers.fighters.create);//may have to adjust this
app.delete('/api/fighters/:fighterId', controllers.fighters.destroy);
app.put('/api/fighters/:fighterId', controllers.fighters.update);
// app.post('/api/fighters/:fighterId/events', controllers.fightersEvents.create);
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

/**********
 * SERVER *
 **********/

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening at http://localhost:3000/');
});
