/************
 * DATABASE *
 ************/
var db = require('../models');

// GET /api/referees
function index(req, res) {
db.Referee.find({}, function(err, allReferees){
  res.json(allReferees);
});
}

function create(req, res) {
  console.log('body', req.body);
  var nextFight = req.body.nextFight.split(',').map(function(item) {
    return item.trim();
  });
  req.body.nextFight = nextFight;

  db.Referee.create(req.body, function(err, referee) {
    if (err) {
      console.log('error', err);
    }
      console.log(referee);
    res.json(referee);
  });
}

function show(req, res) {
  db.Referee.findById(req.params.refereeId, function(err, foundReferee) {
    if(err) {
      console.log('refereesController.show', err);
    }
    console.log('refereesController.show responding with', foundReferee);
    res.json(foundReferee);
  });
}

function destroy(req, res) {
  db.Referee.findOneAndRemove({ _id: req.params.refereeId }, function(err,
foundReferee) {
  // note you could send just send 204, but we're sending 200 and the deleted entity
  res.json(foundReferee);// they may need to be re.json
});
}

function update(req, res) {
  console.log('updating with data', req.body);
  db.Referee.findById(req.params.refereeId, function(err, foundReferee) {
    if(err) { console.log('refereesController.update error', err);
   }
    foundReferee.first_name = req.body.first_name;
    foundReferee.last_name = req.body.last_name;
    foundReferee.rookieYear = req.body.rookieYear;
    foundReferee.nextFight = req.body.nextFight;
    foundReferee.nextFight= req.body.nextFight;
    foundReferee.save(function(err, savedReferee) {
      if(err) { console.log('saving altered referee failed');
    }
    res.json(savedReferee);
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
