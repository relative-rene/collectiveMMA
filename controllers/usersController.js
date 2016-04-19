/************
 * DATABASE *
 ************/
//FIXME this page is an outline
var db = require('../models');

// GET /api/Users
function index(req, res) {
db.User.find({}, function(err, allUsers){
  res.json(allUsers);
});
}

function create(req, res) {
console.log('body',req.body);
var newuser = req.body;
//save and return the new User object
db.User.create( newuser, function saveNewUser(err, savedNewUser) {
    //TODO:  run a check for err
    console.log("SUCCESFULLY SAVED A NEW User: " , savedNewUser);
  res.json(savedNewUser);
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
