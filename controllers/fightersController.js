/************
 * DATABASE *
 ************/
//FIXME this page is an outline

var db = require('../models');

// GET /api/albums
function index(req, res) {
db.Album.find({}, function(err, allAlbums){
  res.json(allAlbums);
});
}

function create(req, res) {
console.log('body',req.body);
var newSong = req.body;
//save and return the new album object
db.Album.create( newSong, function saveNewAlbum(err, savedNewAlbum) {
    //TODO:  run a check for err
    console.log("SUCCESFULLY SAVED A NEW ALBUM: " , savedNewAlbum);
  res.json(savedNewAlbum);
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
