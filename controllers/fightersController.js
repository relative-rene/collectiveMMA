/************
 * DATABASE *
 ************/
var db = require('../models');

// GET /api/fighters
function index(req, res) {
db.Fighter.find({}, function(err, allFighters){
  res.json(allFighters);
});
}

function create(req, res) {
  console.log('body', req.body);

  // split at comma and remove and trailing space
  // var genres = req.body.genres.split(',').map(function(item) { return item.trim(); } );
  // req.body.genres = genres;

  db.Fighter.create(req.body, function(err, fighter) {
    if (err) { console.log('error', err); }
    console.log(fighter);
    res.json(fighter);
  });
}

function show(req, res) {
  db.Fighter.findById(req.params.fighterId, function(err, foundFighter) {
    if(err) {
      console.log('fightersController.show', err);
    }
    console.log('fightersController.show responding with', foundFighter);
    res.json(foundFighter);
  });
}

function destroy(req, res) {
  db.Fighter.findOneAndRemove({ _id: req.params.fighterId }, function(err,
foundFighter) {
  // note you could send just send 204, but we're sending 200 and the deleted entity
  re.json(foundFighter);
});
}

function update(req, res) {
  console.log('updating with data', req.body);
  db.Fighter.findById(req.params.fighterId, function(err, foundFighter) {
    if(err) { console.log('fightersController.update error', err); }
    // foundFighter.artistName = req.body.artistName;
    // foundFighter.name = req.body.name;
    foundFighter.proDebut = req.body.proDebut;
    foundFighter.save(function(err, savedFighter) {
      if(err) { console.log('saving altered fighter failed'); }
      res.json(savedFighter);
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
