function index(req, res) {
  res.json({
    documentation_url:'investigate what documentation url is and update',
    base_url: "https://github.com/relative-rene/thescoreapp",// this may cause issues make sure the url is correct
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/events", description: "retrieves all events"},
      {method: "GET", path: "/api/events/:eventId", description: "retrieves specific event"},
      {method: "POST", path: "/api/events", description: "creating new event"},
      {method: "DELETE", path: "/api/events/:eventId", description: "removing specific event"},
      {method: "GET", path: "/api/fighters", description: "retrieve all fighters"},
      {method: "GET", path: "/api/fighters/:fighterId", description: "retrieve specific fighter"},
      {method: "POST", path: "/api/fighters", description: "creating new fighter"},
      {method: "DELETE", path: "/api/fighters/:fighterId", description: "remove specific fighter"},
      {method: "GET", path: "/api/users", description: "retrieve all users"},
      {method: "GET", path: "/api/users/:userId", description: "retrieve specific user"},
      {method: "POST", path: "/api/users", description: "create new user"},
      {method: "DELETE", path: "/api/users/:userId", description: "remove specific user"},
      {method: "GET", path: "/api/judges", description: "retrieve all judges"},
      {method: "GET", path: "/api/judges/:judgeId", description: "retrieve specific judge"},
      {method: "POST", path: "/api/judges", description: "creating new judge"},
      {method: "DELETE", path: "/api/judges/:judgeId", description: "remove specific judge"},
    ]//eventually add the referee & scoreCard
  });
}

module.exports.index = index;
