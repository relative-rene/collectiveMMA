// server.js
// SERVER-SIDE JAVASCRIPT

/////////////////////////////
//  SETUP and CONFIGURATION
/////////////////////////////
var express = require('express');
var db = require('./models');
var app = express();
var bodyParser = require('body-parser');

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));


////////////////////
//  ROUTES
///////////////////


// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`



// define a root route: localhost:3000/
app.get('/', function (req, res) {
  res.sendFile('views/index.html' , { root : __dirname});
});

//JSON API Endpoints
app.get('/api', function apiIndex(req,res){});
  //TODO: Document all api Endpoints
  res.json({
    message: "Collective MMA api",
    documentation_url:'investigate what documentation url is and update',
    base_url: "https://github.com/relative-rene/project-01",// this may cause issues make sure the url is correct
    endpoints: [
  {method: "GET", path: "/api", description: "Describes all available endpoints"},
  {method: "GET", path: "/api/fighters", description: "retrieves all fighters"},
  {method: "GET", path: "/api/fighters/:id", description: "retrieves specific fighter"},
  {method: "POST", path: "/api/fighters", description: "creating new fighter"},
  {method: "DELETE", path: "/api/fighters/:id", description: "removing specific fighter"},
  {method: "GET", path: "/api/refs", description: "retrieve all refs"},
  {method: "GET", path: "/api/refs/:id", description: "retrieve specific ref"},
  {method: "POST", path: "/api/refs", description: "creating new ref"},
  {method: "DELETE", path: "/api/refs/:id", description: "remove specific ref"},
  {method: "GET", path: "/api/users", description: "retrieve all users"},
  {method: "GET", path: "/api/users/:id", description: "retrieve specific user"},
  {method: "POST", path: "/api/users", description: "create new user"},
  {method: "DELETE", path: "/api/users/:id", description: "remove specific user"},
  {method: "GET", path: "/api/judges", description: "retrieve all judges"},
  {method: "GET", path: "/api/judges/:id", description: "retrieve specific judge"},
  {method: "POST", path: "/api/judges", description: "creating new judge"},
  {method: "DELETE", path: "/api/judges/:id", description: "remove specific judge"},]
  });

app.get('/api/books', function (req, res) {
  // send all books as JSON response
  db.Book.find().populate('author').exec(function(err, books) {
      if (err) { return console.log("index error: " + err); }
      res.json(books);
  });
});

// get one book
app.get('/api/books/:id', function (req, res) {
  db.Books.findOne({_id: req.params._id }, function(err, data) {
    res.json(data);
  });
});

// create new book
app.post('/api/books', function (req, res) {
  // create new book with form data (`req.body`)
  var newBook = new db.Book({
    title: req.body.title,
    image: req.body.image,
    releaseDate: req.body.releaseDate,
  });
  // find the author from req.body
  db.Author.findOne({name: req.body.author}, function(err, author){
    if (err) {
      return console.log(err);
    }
    // add this author to the book
    newBook.author = author;


    // save newBook to database
    newBook.save(function(err, book){
      if (err) {
        return console.log("save error: " + err);
      }
      console.log("saved ", book.title);
      // send back the book!
      res.json(book);
    });
  });
});

// delete book
app.delete('/api/books/:id', function (req, res) {
  // get book id from url params (`req.params`)
  console.log('books delete', req.params);
  var bookId = req.params.id;
  // find the index of the book we want to remove
  db.Book.findOneAndRemove({ _id: bookId }, function (err, deletedBook) {
    res.json(deletedBook);
  });
});




app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening at http://localhost:3000/');
});
