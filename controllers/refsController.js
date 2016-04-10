/************
 * DATABASE *
 ************/
//FIXME this page is an outline

var db = require('../models');

// GET /api/Referees
function index(req, res) {
db.Referee.find({}, function(err, allReferees){
  res.json(allReferees);
});
}

function create(req, res) {
console.log('body',req.body);
var newSong = req.body;
//save and return the new Referee object
db.Referee.create( newSong, function saveNewReferee(err, savedNewReferee) {
    //TODO:  run a check for err
    console.log("SUCCESFULLY SAVED A NEW Referee: " , savedNewReferee);
  res.json(savedNewReferee);
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
