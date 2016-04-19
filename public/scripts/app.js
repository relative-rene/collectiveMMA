$(document).ready(function() {
  createAfighter();
  //index.html fighters
  $('#fighters').on('click', '.add-event', handleAddEventClick);
  $('#fighters').on('click', '.delete-fighter', handleDeleteFighterClick);
  //button hides on click
  $('#fighters').on('click', '.edit-fighter', handleFighterEditClick);
  $('#fighters').on('click', '.save-fighter', handleSaveChangesClick);


  //Make the match
  $('#saveMatch').on('click', handleNewEventSubmit);
  $('#fighters').on('click', '.edit-events', handleEditEventsClick);

  $.get('/api/fighters', function(fighters) {
    fighters.forEach(function(fight) {
      renderFighter(fight);
    });
  });

  //The below renders all Upcoming Events on event.html
  $.get('/api/events', function(matches)  {
    matches.forEach(function(match) {
      renderEvent(match);
    });
  });
});

//The below renders the entire fighter list on index.html
