Technologies Used:
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
Existing Features:
Using the 10 point scoring system, user is able to score rounds for fighter 1 or fighter 2. Score is added and stored.

Planned Features:
1.I will use an external API on fight-matrix or ufc api to populate a            fighter page.  The user will be able to create or add fighter or select   fighter for fight.

2.I will create a seperate form in which the user will also be able to make a fight prediction for upcoming fights or fantasy fight.

3.In the future the user will be able to log in and track individual scorecards or retrieve fight predictions.


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
]
  });
});  
