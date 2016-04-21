// fightersEventsController
var db = require('../models');

// app.get('/api/fighters/:fighterId/events', controllers.fightersEvents.index);
function index(req, res) {
  db.Fighter.findById(req.params.fighterId, function(err, foundFighter) {
    console.log('responding with events:', foundFighter.events);
    res.json(foundFighter.events);
  });
}

// POST '/api/fighters/:fighterId/events'
function create(req, res) {
  db.Fighter.findById(req.params.fighterId, function(err, foundFighter) {
    if (err){
      console.log('error caused', err);
    }
    console.log(req.body);
    var newEvent = new db.Event(req.body); // dangerous, in a real app we'd validate the incoming data
    foundFighter.nextFight.push(newEvent);
    foundFighter.save(function(err, savedFighter) {
      console.log('newEvent created: ', newEvent);
      res.json(newEvent);  // responding with just the event, some APIs may respond with the parent object (Fighter in this case)
    });
  });
}

// app.delete('/api/fighters/:fighterId/events/:eventId', controllers.fightersEvents.destroy);
function destroy(req, res) {
  db.Fighter.findById(req.params.fighterId, function(err, foundFighter) {
    console.log(foundFighter);
    // we've got the fighter, now find the event within it
    var correctEvent = foundFighter.events.id(req.params.eventId);
    if (correctEvent) {
      correctEvent.remove();
      // resave the fighter now that the event is gone
      foundFighter.save(function(err, saved) {
        console.log('REMOVED ', correctEvent.date, 'FROM ', saved.events);
        res.json(correctEvent);
      });
    } else {
      res.send(404);
    }
  });

}

//app.put('/api/fighters/:fighterId/events/:eventId', controllers.fightersEvents.update);
function update(req, res) {
  db.Fighter.findById(req.params.fighterId, function(err, foundFighter) {
    console.log(foundFighter);
    // we've got the fighter, now find the event within it
    var correctEvent = foundFighter.events.id(req.params.eventId);
    if (correctEvent) {
      console.log(req.body);
      correctEvent.opponent = req.body.opponent;
      correctEvent.date = req.body.date;
      foundFighter.save(function(err, saved) {
        console.log('UPDATED', correctEvent, 'IN ', saved.events);
        res.json(correctEvent);
      });
    } else {
      res.send(404);
    }
  });

}


module.exports = {
  index: index,
  create: create,
  update: update,
  destroy: destroy
};
