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
    var weight_class = req.body.weight_class.split(',').map(function(item) {
      return item.trim();
    });
    req.body.weight_class = weight_class;

    db.Event.create(req.body, function(err, event) {
      if (err) {
        console.log('error', err);
      }
        console.log(event);
      res.json(event);
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
      foundEvent.first_name = req.body.first_name;
      foundEvent.last_name = req.body.last_name;
      foundEvent.rookieYear = req.body.rookieYear;
      foundEvent.nextFight = req.body.nextFight;
      foundEvent.weight_class= req.body.weight_class;
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
