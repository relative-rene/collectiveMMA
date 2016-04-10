/************
 * DATABASE *
 ************/
//FIXME this page is an outline

var db = require('../models');

// GET /api/s
function index(req, res) {
db.Fighter.find({}, function(err, allFighters){
  res.json(allFighters);
});
}

function create(req, res) {
console.log('body',req.body);
var newSong = req.body;
//save and return the new Fighter object
db.Fighter.create( newSong, function saveNewFighter(err, savedNewFighter) {
    //TODO:  run a check for err
    console.log("SUCCESFULLY SAVED A NEW Fighter: " , savedNewFighter);
  res.json(savedNewFighter);
});
}

function show(req, res) {
  // FILL ME IN !
}

function destroy(req, res) {
  // FILL ME IN !
}

function update(req, res) {
  // FILL ME IN !
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
