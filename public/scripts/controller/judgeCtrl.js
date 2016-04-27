// when the edit button for an judge is clicked
function handleJudgeEditClick(e) {
  var $judgeRow = $(this).closest('.judge');
  var judgeId = $judgeRow.data('judge-id');
  console.log('edit judge', judgeId);

  // show the save changes button
  $judgeRow.find('.save-judge').toggleClass('hidden');
  // hide the edit button
  $judgeRow.find('.edit-judge').toggleClass('hidden');


  // get the judge name and replace its field with an input element
  var birthName = $judgeRow.find('span.edit-birthName').text();
  $judgeRow.find('span.birthName').html('<input class="edit-birthName" value="' + birthName + '"></input>');
console.log('birthName:',birthName);
  // get the family name and replace its field with an input element
  var familyName = $judgeRow.find('span.edit-familyName').text();
  $judgeRow.find('span.familyName').html('<input class="edit-familyName" value="' + familyName + '"></input>');

  // get the releasedate and replace its field with an input element
  var moniker = $judgeRow.find('span.edit-judgeMoniker').text();
  $judgeRow.find('span.judgeMoniker').html('<input class="edit-judgeMoniker" value="' + moniker + '"></input>');
}

// after editing an judge, when the save changes button is clicked
function handleSaveChangesClick(e) {
  var judgeId = $(this).parents('.judge').data('judge-id'); // $(this).closest would have worked fine too
  var $judgeRow = $('[data-judge-id=' + judgeId + ']');

  var data = {
    birthName: $judgeRow.find('.edit-birthName').val(),
    familyName: $judgeRow.find('.edit-familyName').val(),
    moniker: $judgeRow.find('.edit-judgeMoniker').val()
  };
  console.log('PUTing data for judge', judgeId, 'with data', data);

  $.ajax({
    method: 'PUT',
    url: '/api/judges/' + judgeId,
    data: data,
    success: handleJudgeUpdatedResponse
  });

      // show the save changes button
      $judgeRow.find('.save-judge').toggleClass('hidden');
      // hide the edit button
      $judgeRow.find('.edit-judge').toggleClass('hidden');
}

function handleJudgeUpdatedResponse(data) {
  console.log('response to update', data);

  var judgeId = data._id;
  // scratch this judge from the page
  $('[data-judge-id=' + judgeId + ']').remove();
  // and then re-draw it with the updates ;-)
  renderJudge(data);

  // BONUS: scroll the change into view ;-)
  $('[data-judge-id=' + judgeId + ']')[0].scrollIntoView();
}



// this function takes a single judge and renders it to the page
function renderJudge(judge) {
  console.log('rendering judge', judge);
  var judgeHtml = $('#judge-template').html();
  var judgesTemplate = Handlebars.compile(judgeHtml);
  var html = judgesTemplate(judge);
  $('#judges').prepend(html);
}


//The below renders the entire judge list on index.html
// when edit events button clicked
function handleEditEventsClick(e) {
  var $judgeRow = $(this).closest('.judge');
  var judgeId = $judgeRow.data('judge-id');
  console.log('edit events clicked for ', judgeId);

  // fire zee modal!
  $('#editEventsModal').modal();

}

//event listener
  function handleDeleteJudgeClick(e) {
    var judgeId = $(this).parents('.judge').data('judge-id');
    console.log('someone wants to delete judge id=' + judgeId );
    $.ajax({
      url: '/api/judges/' + judgeId,
      method: 'DELETE',
      success: handleDeleteJudgeSuccess
    });
  }
  // callback after DELETE /api/judges/:id
  function handleDeleteJudgeSuccess(data) {
    var deletedJudgeId = data._id;
    console.log('removing the following judge from the page:', deletedJudgeId);
    $('div[data-judge-id=' + deletedJudgeId + ']').remove();
  }

  // when the add event button is clicked, display the modal
  function handleAddEventClick(e) {
    console.log('add-event clicked!');
    var currentJudgeId = $(this).closest('.judge').data('judge-id'); // "5665ff1678209c64e51b4e7b"
    console.log('id',currentJudgeId);
    $('#eventModal').data('judge-id', currentJudgeId);
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
    var judgeId = $modal.data('judgeId');
    console.log('retrieved date:', date, ' and opponent:', opponent, ' for judge w/ id: ', judgeId);
    // POST to SERVER
    var eventPostToServeUrl = '/api/judges/'+ judgeId + '/events';
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
      // update the correct judge to show the new event
      $.get('/api/judges/' + judgeId, function(data) {
        // remove the current instance of the judge from the page
        $('[data-judge-id=' + judgeId + ']').remove();
        // re-render it with the new judge data (including events)
        renderJudge(data);
        console.log(data);
      })
    .error(function(err) {
      console.log('post to /api/judges/:judgeId/events resulted in error', err);
    });
  }

$(document).ready(function() {
  console.log('app.js loaded!');

  $('#judgeBuilder-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
    $.post('/api/judges', formData, function(judge) {
      console.log('judge after POST', judge);
      renderJudge(judge);  //render the server's response
    });
    $(this).trigger("reset");
  });

  //working functions

  $.get('/api/judges').success(function (judges) {
    judges.forEach(function(judge) {
      renderJudge(judge);
    });
  });

//working listeners
  $('#judges').on('click', '.delete-judge', handleDeleteJudgeClick);
  $('#judges').on('click', '.edit-judge', handleJudgeEditClick);
  $('#judges').on('click', '.add-event', handleAddEventClick);
  $('#judges').on('click', '.save-judge', handleSaveChangesClick);
  $('#saveEvent').on('click', handleNewEventSubmit);
  $('#judges').on('click', '.edit-event', handleEditEventsClick);



});
  // catch and handle the click on an add event button

  // save event modal save button
