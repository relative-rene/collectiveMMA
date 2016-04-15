$(document).ready(function() {
  createAfighter();
  $.get('/api/fighter', function(fighters){
    fighters.forEach(function(fight) {
      renderFighter(fight);
    });
  });
});
function renderFighter(fighter) {
  console.log('rendering fighter', fighter);
  var fighterHtml = $('#fighter-template').html();
  var fightersTemplate = Handlebars.compile(fighterHtml);
  var html = fightersTemplate(fighter);
  $('#fighters').prepend(html);
}
function handleEditEventsClick(){}
function handleAddEventClick(){}
function handleDeleteFighterClick(){}
function handleFighterEditClick(){}
function handleSaveChangesClick(){}
function handleAddEventClick(){}

function handleAlbumEditClick(e) {
  var $fighterRow = $(this).closest('.fighter');
  var albumId = $fighterRow.data('fighter-id');
  console.log('edit fighter', albumId);

  // show the save changes button
  $fighterRow.find('.save-fighter').toggleClass('hidden');
  // hide the edit button
  $fighterRow.find('.edit-fighter').toggleClass('hidden');

  // get the fighter name and replace its field with an input element
  var albumName = $fighterRow.find('span.fighter-name').text();
  $fighterRow.find('span.fighter-name').html('<input class="edit-fighter-name" value="' + albumName + '"></input>');

  // get the event name and replace its field with an input element
  var eventName = $fighterRow.find('span.event-name').text();
  $fighterRow.find('span.event-name').html('<input class="edit-event-name" value="' + eventName + '"></input>');

  // get the releasedate and replace its field with an input element
  var releaseDate = $fighterRow.find('span.fighter-releaseDate').text();
  $fighterRow.find('span.fighter-releaseDate').html('<input class="edit-fighter-releaseDate" value="' + releaseDate + '"></input>');
}

function handleSaveChangesClick(event){
  //when created mongoose generates an id this variable stores that random number
  var fighterId = $(this).closest('.fighter').data('fighter-id');
  //this vaiable assigns the fighterId to generated id to data-fighter-id atttribute
  var $fighterRow = $('[data-fighter-id='+ fighterId + ']');
  //this variable is capturing the value entered in the edit input
  var data = {
    nextFight: $fighterRow.find('.edit-fighter-nextFight').val(),
    moniker: $fighterRow.find('.edit-fighter-moniker').val(),
    fantasyFight: $fightRow.find('.edit-fighter-ff').val()
  };
    console.log('PUTing data for fighter', fighterId, 'with data', data);

    $.ajax({
      method: 'PUT',
      url: '/api/albums/' + fighterId,
      data: data,
      success: handleFighterUpdateResponse
    });
}
function createAfighter() {
  $('#fighterBuilder-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
//shorthand ajax call
    $.post('/api/fighters', formData, function(fighter) {
      console.log('fighters after POST', fighter);
      renderFighter(fighter);
    }).error(function(){
      console.log('their was an error with your post',fighter);
    });
  });
}
console.log('sanity check');
