//I may need the genres code for adding event to event
  // split at comma and remove and trailing space
  // var genres = req.body.genres.split(',').map(function(item) { return item.trim(); } );
  // req.body.genres = genres;
  /************
   * DATABASE *
   ************/
  var db = require('../models');

  // GET /api/events
  function index(req, res) {
  db.Event.find({}, function(err, allEvents){
    res.json(allEvents);
  });
  }

  function create(req, res) {
    console.log('body', req.body);
    db.Fighter.findOne({_id:req.params.fighterId}, function (err, fighter)  {
      if(err) {
        console.log('error',err);
      }
      var event = new db.Event(req.body);
      fighter.events.push(event);
      fighter.save(function(err, savedFighter) {
        if (err) {
          console.log('error', err);
        }
        console.log('fighter with new event saved:', savedFighter);
        res.json(event);
      });
    });
  }

  function show(req, res) {
    db.Event.findById(req.params.eventId, function(err, foundEvent) {
      if(err) {
        console.log('eventsController.show', err);
      }
      console.log('eventsController.show responding with', foundEvent);
      res.json(foundEvent);
    });
  }

  function destroy(req, res) {
    db.Event.findOneAndRemove({ _id: req.params.eventId }, function(err,
  foundEvent) {
    // note you could send just send 204, but we're sending 200 and the deleted entity
    res.json(foundEvent);// they may need to be re.json
  });
  }

  function update(req, res) {
    console.log('updating with data', req.body);
    db.Event.findById(req.params.eventId, function(err, foundEvent) {
      if(err) { console.log('eventsController.update error', err);
     }
      foundEvent.headliner = req.body.headliner;
      foundEvent.arena = req.body.arena;
      foundEvent.rookieYear = req.body.rookieYear;
      foundEvent.nextFight = req.body.nextFight;
      foundEvent.fight= req.body.fight;
      foundEvent.save(function(err, savedEvent) {
        if(err) { console.log('saving altered event failed');
      }
      res.json(savedEvent);
    });
  });
  }

  // export public methods here
  module.exports = {
    index: index,
    create: create,
    show: show,
    destroy: destroy,
    update: update
  };
