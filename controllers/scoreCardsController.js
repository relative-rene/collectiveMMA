/************
 * DATABASE *
 ************/
var db = require('../models');

// GET /api/scoreCards
function index(req, res) {
db.ScoreCard.find({}, function(err, allScoreCards){
  res.json(allScoreCards);
});
}

function create(req, res) {
  console.log('body', req.body);
  var weight_class = req.body.weight_class.split(',').map(function(item) {
    return item.trim();
  });
  req.body.weight_class = weight_class;

  db.ScoreCard.create(req.body, function(err, scoreCard) {
    if (err) {
      console.log('error', err);
    }
      console.log(scoreCard);
    res.json(scoreCard);
  });
}

function show(req, res) {
  db.ScoreCard.findById(req.params.scoreCardId, function(err, foundScoreCard) {
    if(err) {
      console.log('scoreCardsController.show', err);
    }
    console.log('scoreCardsController.show responding with', foundScoreCard);
    res.json(foundScoreCard);
  });
}

function destroy(req, res) {
  db.ScoreCard.findOneAndRemove({ _id: req.params.scoreCardId }, function(err,
foundScoreCard) {
  // note you could send just send 204, but we're sending 200 and the deleted entity
  res.json(foundScoreCard);// they may need to be re.json
});
}

function update(req, res) {
  console.log('updating with data', req.body);
  db.ScoreCard.findById(req.params.scoreCardId, function(err, foundScoreCard) {
    if(err) { console.log('scoreCardsController.update error', err);
   }
    foundScoreCard.first_name = req.body.first_name;
    foundScoreCard.last_name = req.body.last_name;
    foundScoreCard.rookieYear = req.body.rookieYear;
    foundScoreCard.nextFight = req.body.nextFight;
    foundScoreCard.weight_class= req.body.weight_class;
    foundScoreCard.save(function(err, savedScoreCard) {
      if(err) { console.log('saving altered scoreCard failed');
    }
    res.json(savedScoreCard);
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
