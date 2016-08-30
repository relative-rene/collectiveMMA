// SERVER-SIDE JAVASCRIPT

// MODULES  //////

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// CONFIGURATION  /////

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static(__dirname + '/public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use('/vendor', express.static(__dirname + '/bower_components'));
var controllers = require('./controllers');

////////////////////
//  ROUTES
///////////////////


// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`



// define a root route: localhost:3000/
app.get('/', function homepage (req, res) {
  res.sendFile(__dirname + '/views/index.html');
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
app.post('/api/fighters/:fighterId/events', controllers.fightersEvents.create);//may have to adjust this
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
