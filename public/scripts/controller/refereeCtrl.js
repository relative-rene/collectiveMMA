// when the edit button for an referee is clicked
function handleRefereeEditClick(e) {
  var $refereeRow = $(this).closest('.referee');
  var refereeId = $refereeRow.data('referee-id');
  console.log('edit referee', refereeId);

  // show the save changes button
  $refereeRow.find('.save-referee').toggleClass('hidden');
  // hide the edit button
  $refereeRow.find('.edit-referee').toggleClass('hidden');


  // get the referee name and replace its field with an input element
  var birthName = $refereeRow.find('span.edit-birthName').text();
  $refereeRow.find('span.birthName').html('<input class="edit-birthName" value="' + birthName + '"></input>');
console.log('birthName:',birthName);
  // get the family name and replace its field with an input element
  var familyName = $refereeRow.find('span.edit-familyName').text();
  $refereeRow.find('span.familyName').html('<input class="edit-familyName" value="' + familyName + '"></input>');

  // get the releasedate and replace its field with an input element
  var moniker = $refereeRow.find('span.edit-refereeMoniker').text();
  $refereeRow.find('span.refereeMoniker').html('<input class="edit-refereeMoniker" value="' + moniker + '"></input>');
}

// after editing an referee, when the save changes button is clicked
function handleSaveChangesClick(e) {
  var refereeId = $(this).parents('.referee').data('referee-id'); // $(this).closest would have worked fine too
  var $refereeRow = $('[data-referee-id=' + refereeId + ']');

  var data = {
    birthName: $refereeRow.find('.edit-birthName').val(),
    familyName: $refereeRow.find('.edit-familyName').val(),
    moniker: $refereeRow.find('.edit-refereeMoniker').val()
  };
  console.log('PUTing data for referee', refereeId, 'with data', data);

  $.ajax({
    method: 'PUT',
    url: '/api/referees/' + refereeId,
    data: data,
    success: handleRefereeUpdatedResponse
  });

      // show the save changes button
      $refereeRow.find('.save-referee').toggleClass('hidden');
      // hide the edit button
      $refereeRow.find('.edit-referee').toggleClass('hidden');
}

function handleRefereeUpdatedResponse(data) {
  console.log('response to update', data);

  var refereeId = data._id;
  // scratch this referee from the page
  $('[data-referee-id=' + refereeId + ']').remove();
  // and then re-draw it with the updates ;-)
  renderReferee(data);

  // BONUS: scroll the change into view ;-)
  $('[data-referee-id=' + refereeId + ']')[0].scrollIntoView();
}



// this function takes a single referee and renders it to the page
function renderReferee(referee) {
  console.log('rendering referee', referee);
  var refereeHtml = $('#referee-template').html();
  var refereesTemplate = Handlebars.compile(refereeHtml);
  var html = refereesTemplate(referee);
  $('#referees').prepend(html);
}


//The below renders the entire referee list on index.html
// when edit events button clicked
function handleEditEventsClick(e) {
  var $refereeRow = $(this).closest('.referee');
  var refereeId = $refereeRow.data('referee-id');
  console.log('edit events clicked for ', refereeId);

  // fire zee modal!
  $('#editEventsModal').modal();

}

//event listener
  function handleDeleteRefereeClick(e) {
    var refereeId = $(this).parents('.referee').data('referee-id');
    console.log('someone wants to delete referee id=' + refereeId );
    $.ajax({
      url: '/api/referees/' + refereeId,
      method: 'DELETE',
      success: handleDeleteRefereeSuccess
    });
  }
  // callback after DELETE /api/referees/:id
  function handleDeleteRefereeSuccess(data) {
    var deletedRefereeId = data._id;
    console.log('removing the following referee from the page:', deletedRefereeId);
    $('div[data-referee-id=' + deletedRefereeId + ']').remove();
  }

  // when the add event button is clicked, display the modal
  function handleAddEventClick(e) {
    console.log('add-event clicked!');
    var currentRefereeId = $(this).closest('.referee').data('referee-id'); // "5665ff1678209c64e51b4e7b"
    console.log('id',currentRefereeId);
    $('#eventModal').data('referee-id', currentRefereeId);
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
    var refereeId = $modal.data('refereeId');
    console.log('retrieved date:', date, ' and opponent:', opponent, ' for referee w/ id: ', refereeId);
    // POST to SERVER
    var eventPostToServeUrl = '/api/referees/'+ refereeId + '/events';
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
      // update the correct referee to show the new event
      $.get('/api/referees/' + refereeId, function(data) {
        // remove the current instance of the referee from the page
        $('[data-referee-id=' + refereeId + ']').remove();
        // re-render it with the new referee data (including events)
        renderReferee(data);
        console.log(data);
      })
    .error(function(err) {
      console.log('post to /api/referees/:refereeId/events resulted in error', err);
    });
  }

$(document).ready(function() {
  console.log('app.js loaded!');

  $('#refereeBuilder-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
    $.post('/api/referees', formData, function(referee) {
      console.log('referee after POST', referee);
      renderReferee(referee);  //render the server's response
    });
    $(this).trigger("reset");
  });

  //working functions

  $.get('/api/referees').success(function (referees) {
    referees.forEach(function(referee) {
      renderReferee(referee);
    });
  });

//working listeners
  $('#referees').on('click', '.delete-referee', handleDeleteRefereeClick);
  $('#referees').on('click', '.edit-referee', handleRefereeEditClick);
  $('#referees').on('click', '.add-event', handleAddEventClick);
  $('#referees').on('click', '.save-referee', handleSaveChangesClick);
  $('#saveEvent').on('click', handleNewEventSubmit);
  $('#referees').on('click', '.edit-event', handleEditEventsClick);



});
  // catch and handle the click on an add event button

  // save event modal save button
