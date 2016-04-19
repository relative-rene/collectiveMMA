/************
 * DATABASE *
 ************/
//FIXME this page is an outline

var db = require('../models');

// GET /api/Judges
function index(req, res) {
db.Judge.find({}, function(err, allJudges){
  res.json(allJudges);
});
}

function create(req, res) {
console.log('body',req.body);
var newjudge = req.body;
//save and return the new Judge object
db.Judge.create( newjudge, function saveNewJudge(err, savedNewJudge) {
    //TODO:  run a check for err
    console.log("SUCCESFULLY SAVED A NEW Judge: " , savedNewJudge);
  res.json(savedNewJudge);
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
