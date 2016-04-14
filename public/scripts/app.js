console.log('Sanity Check: js is working');
var template;

$(document).ready(function(){
  $.get('/api/fighters').success(function (fighters) {
    fighters.forEach(function(fighter) {
      renderFighter(fighter);
    });
  });
    $('#fighters').on('click', '.add-event', handleAddEventClick);
    $('#saveEvent').on('click', handleNewEventSubmit);
    $('#fighters').on('click', '.delete-fighter', handleDeleteFighterClick);
    $('#fighters').on('click', '.edit-fighter', handleFighterEditClick);
    $('#fighters').on('click', '.save-fighter', handleSaveChangesClick);
    $('#fighters').on('click', '.edit-events', handleEditEventsClick);

    $('#fighterBuilder-form').on('submit','#signAfighter', function(e) {
        e.preventDefault();
        console.log(e);
        var formData = $(this).serialize();
        console.log('formData', formData);
        $.post('/api/fighters', formData, function(fighter) {
          console.log('fighter after POST', fighter);
          renderFighter(fighter);  //render the server's response
        });
        $(this).trigger("reset");
      });
  });//doc ready ends=-----------


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
function handleNewEventSubmit(e) {
  e.preventDefault();
  var $modal = $('#eventModal');
  var $eventNameField = $modal.find('#eventName');
  var $trackNumberField = $modal.find('#trackNumber');

  // get data from modal fields
  // note the server expects the keys to be 'name', 'trackNumber' so we use those.
  var dataToPost = {
    name: $eventNameField.val(),
    trackNumber: $trackNumberField.val()
  };
  var fighterId = $modal.data('fighterId');
  console.log('retrieved eventName:', eventName, ' and trackNumber:', trackNumber, ' for fighter w/ id: ', fighterId);
  // POST to SERVER
  var eventPostToServerUrl = '/api/fighters/'+ fighterId + '/events';
  $.post(eventPostToServerUrl, dataToPost, function(data) {
    console.log('received data from post to /events:', data);
    // clear form
    $eventNameField.val('');
    $trackNumberField.val('');

    // close modal
    $modal.modal('hide');
    // update the correct fighter to show the new event
    $.get('/api/fighters/' + fighterId, function(data) {
      // remove the current instance of the fighter from the page
      $('[data-fighter-id=' + fighterId + ']').remove();
      // re-render it with the new fighter data (including events)
      renderFighter(data);
    });
  }).error(function(err) {
    console.log('post to /api/fighters/:fighterId/events resulted in error', err);
  });
}


$("li .fighterCreate").click(function(){
  $.ajax({
    url:".kdjasfkl;",
    method:"POST",
    success:createFighter,
    error:function(event){
      console.log('fighter create not working',event);
    }
  });
});

// $('#Submit-total').on('click',function(){
//     var fighter1Total, fighter2Total;
//     var f1round1 = parseInt($('#F1R1').html());
//     var f1round2 = parseInt($('#F1R2').html());
//     var f1round3 = parseInt($('#F1R3').html());
//     var f1round4 = parseInt($('#F1R4').html());
//     var f1round5 = parseInt($('#F1R5').html());
//     fighter1Total = f1round5+f1round4+f1round3+f1round2+f1round1;
//
//     var f2round1 = parseInt($('#F2R1').html());
//     var f2round2 = parseInt($('#F2R2').html());
//     var f2round3 = parseInt($('#F2R3').html());
//     var f2round4 = parseInt($('#F2R4').html());
//     var f2round5 = parseInt($('#F2R5').html());
//
//     fighter2Total = f2round5+f2round4+f2round3+f2round2+f2round1;
//     console.log('fighter2 '+ fighter2Total,'fighter1 '+ fighter1Total);
//     $('#total').html("<h1>"+'fighter 2: '+ fighter2Total+'fighter 1: '+fighter1Total+"</h1>");
//     return fighter2Total + fighter1Total;
// });

//     var fighter1Total = 0, fighter2Total = 0;
//     var fighter1 = $('.fighter1').each(function(index,fighter1button) {
//         console.log('fighter1 total',fighter1Total);
//         fighter1Total += fighter1button;
//         console.log('fighter1total',fighter1Total);
//       });
//     var fighter2 = $('.fighter2').each(function(index, fighter2button) {
//         console.log('fighter2button',fighter2button);
//         fighter2Total += fighter2button;
//         console.log('fighter2total',fighter2Total);
//     });
//   });
//
//
//
// event Listener function
//   $(".dropdown-menu li a").click(function(event){
//     var $linkText= $(this).text();
//     $(this).parents(".btn-group").find('.selection').text($linkText);
//     console.log(this);
//     event.preventDefault();
// });
//
// });
//
// $('#total').html("<h3>"+'fighter 2'+ fighter2total+'fighter 1'+"</h3>");
// function fighterDisplay(){
//   $.ajax({
//     url:'http://ufc-data-api.ufc.com/api/v1/us/fighters',
//     method: 'POST',
//     success:
//     error:function(err){
//       console.log(err)
//     }
//   });
//
//
// function fighter1Score(){
//   var fighter1=0;
// $(".dropdown-menu li a").click(function(event){
//             $(this).parents(".btn-group1").find('.selection').val($(this).text());
// event.fighter1 += +$(this).parents(".btn-group1").find('.selection').text($(this).text());
//               console.log(fighter1);
//               event.preventDefault();
//             });
//           }
//
// function fighter2Score(){
//   var fighter2=0;
//   $(".dropdown-menu li a").click(function(event){
//             $(this).parents(".btn-group2").find('.selection').val($(this).text());
// event.fighter2 += +$(this).parents(".btn-group2").find('.selection').text($(this).text());
//               event.preventDefault();
//               console.log(fighter2);
//             });
//           }
