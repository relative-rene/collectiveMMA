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

//////helper functions
function renderEvent(match) {
  console.log('rendering event', match);
  var eventHtml = $('#event-template').html();
  console.log('logging eventHtml', eventHtml);
  var eventsTemplate = Handlebars.compile(eventHtml);
  console.log('logging event Template',eventsTemplate);
  var html = eventsTemplate(event);
  $('#events').prepend(html);
}

function renderFighter(fighter) {
  console.log('rendering fighter', fighter);
  var fighterHtml = $('#fighter-template').html();
  console.log('logging fighterHtml', fighterHtml);
  var fightersTemplate = Handlebars.compile(fighterHtml);
  console.log('logging fighter Template',fightersTemplate);
  var html = fightersTemplate(fighter);
  $('#fighters').prepend(html);
}



// when the add event button is clicked, display the modal
function handleAddEventClick(e) {
  console.log('add-event clicked!');
  var $currentFighterId = $(this).closest('.fighter').data('fighter-id'); // "5665ff1678209c64e51b4e7b"
  console.log('id:',$currentFighterId,'$(this):',this);
  $('#eventModal').data('fighter-id', $currentFighterId);
  $('#eventModal').modal();  // display the modal!
}

function handleNewEventSubmit(event) {
  var $fighterId = $('#eventModal').data('fighter-id');
  var $opponent = $('#opponent').val();
  var $date  = $('#date').val();

  var formData = {
    opponent: $opponent,
    date: $date,
  };

console.log("formData: "+ formData + 'Date: '+ $dateField, 'Opponent: '+ $opponent +' for fighter w/ id: '+ fighterId);

  // POST to SERVER
  var eventPostToServerUrl = '/api/fighters/'+ fighterId + '/events';
  $.post(eventPostToServerUrl, formData, function(event) {
    console.log('received data from post to /event:', event);

    // update the correct fighter to show the new event
    $.get('/api/fighters/' + fighterId, function(fighter) {
      // remove the current instance of the fighter from the page
      $('[data-fighter-id=' + fighterId + ']').remove();
      // re-render it with the new fighter data (including events)
      renderFighter(data);
    });
  }).error(function(err) {
    console.log('post to /api/fighters/:fighterId/events resulted in error', err);
  });
  $('#opponent').val('');
  $('#date').val('');
  $('#eventModal').modal('hide');


}

function handleEditEventsClick(e) {
  //the below gathers
  var $fighterRow = $(this).closest('.fighter');
  var fighterId = $fighterRow.data('fighter-id');
  console.log('edit events clicked for ', fighterId);

  // fire zee modal!
  $('#editEventsModal').modal();

}

function handleFighterEditClick(e) {
  var $fighterRow = $(this).closest('.fighter');
  var fighterId = $fighterRow.data('fighter-id');
  console.log('edit fighter', fighterId);

  // show the save changes button
  $fighterRow.find('.save-fighter').toggleClass('hidden');
  // hide the edit button
  $fighterRow.find('.edit-fighter').toggleClass('hidden');

  // get the fighter name and replace its field with an input element
  var birthName = $fighterRow.find('span.birthName').text();
  $fighterRow.find('span.birthName').html('<input class="edit-birthName" value="' + birthName + '"></input>');

  // get the event name and replace its field with an input element
  var familyName = $fighterRow.find('span.familyName').text();
  $fighterRow.find('span.familyName').html('<input class="edit-familyName" value="' + familyName + '"></input>');

  // get the rookieYear and replace its field with an input element
  var rookieYear = $fighterRow.find('span.fighter-rookieYear').text();
  $fighterRow.find('span.fighter-rookieYear').html('<input class="edit-rookieYear" value="' + rookieYear + '"></input>');
}


function handleSaveChangesClick(event){
  //when created mongoose generates an id this variable stores that random number
  var fighterId = $(this).closest('.fighter').data('fighter-id');
  //this vaiable assigns the fighterId to generated id to data-fighter-id atttribute
  var $fighterRow = $('[data-fighter-id='+ fighterId + ']');
  //this variable is capturing the value entered in the edit input
  var data = {
    birthName: $fighterRow.find('.edit-birthName').val(),
    familyName: $fighterRow.find('.edit-familyName').val(),
  };
    console.log('PUTing data for fighter', fighterId, 'with data', data);

    $.ajax({
      method: 'PUT',
      url: '/api/fighters/' + fighterId,
      data: data,
      success: handleFighterEditClick
    });
}


function handleDeleteFighterClick(e) {
  var fighterId = $(this).parents('.fighter').data('fighter-id');
  console.log('someone wants to delete fighter id=' + fighterId );
  $.ajax({
    url: '/api/fighters/' + fighterId,
    method: 'DELETE',
    success: handleDeleteFighterSuccess
  });
}


// callback after DELETE /api/fighters/:id
function handleDeleteFighterSuccess(data) {
  var deletedFighterId = data._id;
  console.log('removing the following fighter from the page:', deletedFighterId);
  $('div[data-fighter-id=' + deletedFighterId + ']').remove();
}


function createAfighter() {
  $('.navbar-right').on('click','.navBarfighterCreate', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
//shorthand ajax post
    $.post('/api/fighters', formData, function(fighter) {
      console.log('fighters after POST', fighter);
      renderFighter(fighter);
    }).error(function(){
      console.log('their was an error with your post',fighter);
    });
    //the code below erases the input textarea
    $(this).trigger('reset');
  });
}


function createnewEvent(sent) {
  sent.preventDefault();
  var formData = $(this).serialize();
  console.log('formData', formData);
  $.ajax({
    url:'api/events',
    method:"POST",
    data:formData,
    success: renderEvents(match),
      error: function(err){
        console.log('mistake made on event $.ajax call', err);
      }
  });
  $(this).trigger('reset');
}


//   var $modal = $('#eventModal');
//   var $eventNameField = $modal.find('#eventName');
//   var $placeArenaField = $modal.find('#placeArena');
//   // get data from modal fields
//   // note the server expects the keys to be 'name', 'placeArena' so we use those.
//   var dataToPost = {
//     date:$dateField.val(),
//     fights:$opponentField.val(),
//     arena:$arenaField.val(),
//     city:$cityField.val(),
//   };
//   var fighterId = $modal.data('fighterId');
//   console.log('retrieved eventName:', eventName, ' and placeArena:', placeArena, ' for fighter w/ id: ', fighterId);
//   console.log('Date:',$dateField, 'Opponent:'+$opponentField, 'Arena:' + $arenaField, 'City:'+ $cityField, ' for fighter w/ id: '+ fighterId);
//   // POST to SERVER
//   var eventPostToServerUrl = '/api/fighters/'+ fighterId + '/events';
//
//   $.post(eventPostToServerUrl, dataToPost, function(data) {
//     console.log('received data from post to /events:', data);
//     // clear form
//     $dateField.val(''),
//     $opponentField.val(''),
//     $arenaField.val(''),
//     $cityField.val(''),
//
//     // close modal
//     $modal.modal('hide'),
//
//     // update the correct fighter to show the new event
//     $.get('/api/fighters/' + fighterId, function(data) {
//       // remove the current instance of the fighter from the page
//       $('[data-fighter-id=' + fighterId + ']').remove();
//       // re-render it with the new fighter data (including events)
//       renderFighter(data);
//   }).error(function(err) {
//     console.log('post to /api/fighters/:fighterId/events resulted in error', err);
// });
// });

// failed attempt to use external api to populate the fighters
//   $.get('http://ufc-data-api.ufc.com/api/v3/iphone/fighters', function(fighters) {
//     fighters.forEach(function(fighter) {
//       renderFighter(fighter);
//     });
//   });
// });

// //The below renders the entire fighter list on index.html
