function renderFighter(fighter) {
  console.log('rendering fighter', fighter);
  var fighterHtml = $('#fighter-template').html();
  console.log('logging fighterHtml', fighterHtml);
  var fightersTemplate = Handlebars.compile(fighterHtml);
  console.log('logging fighter Template',fightersTemplate);
  var html = fightersTemplate(fighter);
  $('#fighters').prepend(html);
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
