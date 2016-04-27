// when the edit button for an fighter is clicked
function handleFighterEditClick(e) {
  var $fighterRow = $(this).closest('.fighter');
  var fighterId = $fighterRow.data('fighter-id');
  console.log('edit fighter', fighterId);

  // show the save changes button
  $fighterRow.find('.save-fighter').toggleClass('hidden');
  // hide the edit button
  $fighterRow.find('.edit-fighter').toggleClass('hidden');


  // get the fighter name and replace its field with an input element
  var birthName = $fighterRow.find('span.edit-birthName').text();
  $fighterRow.find('span.birthName').html('<input class="edit-birthName" value="' + birthName + '"></input>');
console.log('birthName:',birthName);
  // get the family name and replace its field with an input element
  var familyName = $fighterRow.find('span.edit-familyName').text();
  $fighterRow.find('span.familyName').html('<input class="edit-familyName" value="' + familyName + '"></input>');

  // get the releasedate and replace its field with an input element
  var moniker = $fighterRow.find('span.edit-fighterMoniker').text();
  $fighterRow.find('span.fighterMoniker').html('<input class="edit-fighterMoniker" value="' + moniker + '"></input>');
}

// after editing an fighter, when the save changes button is clicked
function handleSaveChangesClick(e) {
  var fighterId = $(this).parents('.fighter').data('fighter-id'); // $(this).closest would have worked fine too
  var $fighterRow = $('[data-fighter-id=' + fighterId + ']');

  var data = {
    birthName: $fighterRow.find('.edit-birthName').val(),
    familyName: $fighterRow.find('.edit-familyName').val(),
    moniker: $fighterRow.find('.edit-fighterMoniker').val()
  };
  console.log('PUTing data for fighter', fighterId, 'with data', data);

  $.ajax({
    method: 'PUT',
    url: '/api/fighters/' + fighterId,
    data: data,
    success: handleFighterUpdatedResponse
  });

      // show the save changes button
      $fighterRow.find('.save-fighter').toggleClass('hidden');
      // hide the edit button
      $fighterRow.find('.edit-fighter').toggleClass('hidden');
}

function handleFighterUpdatedResponse(data) {
  console.log('response to update', data);

  var fighterId = data._id;
  // scratch this fighter from the page
  $('[data-fighter-id=' + fighterId + ']').remove();
  // and then re-draw it with the updates ;-)
  renderFighter(data);

  // BONUS: scroll the change into view ;-)
  $('[data-fighter-id=' + fighterId + ']')[0].scrollIntoView();
}



// this function takes a single fighter and renders it to the page
function renderFighter(fighter) {
  console.log('rendering fighter', fighter);
  var fighterHtml = $('#fighter-template').html();
  var fightersTemplate = Handlebars.compile(fighterHtml);
  var html = fightersTemplate(fighter);
  $('#fighters').prepend(html);
}


//The below renders the entire fighter list on index.html
// when edit events button clicked
function handleEditEventsClick(e) {
  var $fighterRow = $(this).closest('.fighter');
  var fighterId = $fighterRow.data('fighter-id');
  console.log('edit events clicked for ', fighterId);

  // fire zee modal!
  $('#editEventsModal').modal();

}

//event listener
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

  // when the add event button is clicked, display the modal
  function handleAddEventClick(e) {
    console.log('add-event clicked!');
    var currentFighterId = $(this).closest('.fighter').data('fighter-id'); // "5665ff1678209c64e51b4e7b"
    console.log('id',currentFighterId);
    $('#eventModal').data('fighter-id', currentFighterId);
    $('#eventModal').modal();  // display the modal!
  }

  // when the event modal submit button is clicked:
  function handleNewEventSubmit(e) {

    var $modal = $('#eventModal');
    var $date = $modal.find('#date');
    var $opponent = $modal.find('#opponent');
    console.log($modal,$date,$opponent);

    // get data from modal fields
    // note the server expects the keys to be 'name', 'opponent' so we use those.
    var formPost = {
      name: $date.val(),
      opponent: $opponent.val()
    };
    console.log(formPost);
    var fighterId = $modal.data('fighterId');
    console.log('retrieved date:', date, ' and opponent:', opponent, ' for fighter w/ id: ', fighterId);
    // POST to SERVER
    var eventPostToServeUrl = '/api/fighters/'+ fighterId + '/events';
console.log(eventPostToServeUrl);
    $.ajax({
      url:eventPostToServeUrl,
      method:'PUT',
      data:formPost,
      success: function(data) {
      console.log('received data from put to /events:', data);
    }
  });
      // clear form
      $date.val('');
      $opponent.val('');

      // close modal
      $modal.modal('hide');
      // update the correct fighter to show the new event
      $.get('/api/fighters/' + fighterId, function(data) {
        // remove the current instance of the fighter from the page
        $('[data-fighter-id=' + fighterId + ']').remove();
        // re-render it with the new fighter data (including events)
        renderFighter(data);
        console.log(data);
      })
    .error(function(err) {
      console.log('post to /api/fighters/:fighterId/events resulted in error', err);
    });
  }

$(document).ready(function() {
  console.log('app.js loaded!');

  $('#fighterBuilder-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
    $.post('/api/fighters', formData, function(fighter) {
      console.log('fighter after POST', fighter);
      renderFighter(fighter);  //render the server's response
    });
    $(this).trigger("reset");
  });

  //working functions

  $.get('/api/fighters').success(function (fighters) {
    fighters.forEach(function(fighter) {
      renderFighter(fighter);
    });
  });

//working listeners
  $('#fighters').on('click', '.delete-fighter', handleDeleteFighterClick);
  $('#fighters').on('click', '.edit-fighter', handleFighterEditClick);
  $('#fighters').on('click', '.add-event', handleAddEventClick);
  $('#fighters').on('click', '.save-fighter', handleSaveChangesClick);
  $('#saveEvent').on('click', handleNewEventSubmit);
  $('#fighters').on('click', '.edit-event', handleEditEventsClick);



});
  // catch and handle the click on an add event button

  // save event modal save button
