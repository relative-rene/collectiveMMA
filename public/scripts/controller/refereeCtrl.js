$(document).ready(function() {
  $.get('/api/referees').success(function (refs) {
      refs.forEach(function(ref) {
        renderReferee(ref);
      });
    });

});

function renderReferee(referee) {
  console.log('rendering referee', referee);
  var refereeHtml = $('#referee-template').html();
  var refereesTemplate = Handlebars.compile(refereeHtml);
  var html = refereesTemplate(referee);
  $('#referees').prepend(html);
}

$('#referee-form form').on('submit', function(e) {
  e.preventDefault();
  var formData = $(this).serialize();
  console.log('formData', formData);
  $.post('/api/referees', formData, function(referee) {
    console.log('referee after POST', referee);
    renderReferee(referee);  //render the server's response
  });
  $(this).trigger("reset");
});

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
  var refereeName = $refereeRow.find('span.referee-name').text();
  $refereeRow.find('span.referee-name').html('<input class="edit-referee-name" value="' + refereeName + '"></input>');

  // get the artist name and replace its field with an input element
  var artistName = $refereeRow.find('span.artist-name').text();
  $refereeRow.find('span.artist-name').html('<input class="edit-artist-name" value="' + artistName + '"></input>');

  // get the releasedate and replace its field with an input element
  var releaseDate = $refereeRow.find('span.referee-releaseDate').text();
  $refereeRow.find('span.referee-releaseDate').html('<input class="edit-referee-releaseDate" value="' + releaseDate + '"></input>');
}

// after editing an referee, when the save changes button is clicked
function handleSaveChangesClick(e) {
  var refereeId = $(this).parents('.referee').data('referee-id'); // $(this).closest would have worked fine too
  var $refereeRow = $('[data-referee-id=' + refereeId + ']');

  var data = {
    name: $refereeRow.find('.edit-referee-name').val(),
    artistName: $refereeRow.find('.edit-artist-name').val(),
    releaseDate: $refereeRow.find('.edit-referee-releaseDate').val()
  };
  console.log('PUTing data for referee', refereeId, 'with data', data);

  $.ajax({
    method: 'PUT',
    url: '/api/referees/' + refereeId,
    data: data,
    success: handleRefereeUpdatedResponse
  });
}

function handleDeleteRefereeClick(e) {
  var refereeId = $(this).parents('.referee').data('referee-id');
  console.log('someone wants to delete referee id=' + refereeId );
  $.ajax({
    url: '/api/referees/' + refereeId,
    method: 'DELETE',
    success: handleDeleteRefereeSuccess
  });
}

function handleDeleteRefereeSuccess(data) {
  var deletedRefereeId = data._id;
  console.log('removing the following referee from the page:', deletedRefereeId);
  $('div[data-referee-id=' + deletedRefereeId + ']').remove();
}
