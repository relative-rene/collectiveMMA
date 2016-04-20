// $(document).ready(function() {
//   //index.html fighters
//   $('#fighters').on('click', '.add-event', handleAddEventClick);
//   //button hides on click
//   $('#fighters').on('click', '.save-fighter', handleSaveChangesClick);
//   //Make the match
//   $('#saveEvent').on('click', handleNewEventSubmit);
//   $('#fighters').on('click', '.edit-events', handleEditEventsClick);
// 
//   $('#eventBuilder form').on('submit',function(event){
//     event.preventDefault();
//     var formData = $(this).serialize();
//     console.log('formData', formData);
//     $.post('/api/events', formData, function(event) {
//       console.log('event after POST', event);
//       renderEvent(event);
//     });
//     $(this).trigger('reset');
//   });
//
//   //The below renders all Upcoming Events on event.html
//   $.get('/api/events', function(matches)  {
//     matches.forEach(function(match) {
//       renderEvent(match);
//     });
//   });
// });
// function renderEvent(match) {
//   console.log('rendering event', match);
//   var eventHtml = $('#event-template').html();
//   console.log('logging eventHtml', eventHtml);
//   var eventsTemplate = Handlebars.compile(eventHtml);
//   console.log('logging event Template',eventsTemplate);
//   var html = eventsTemplate(event);
//   $('#events').prepend(html);
// }
//
// // when the add event button is clicked, display the modal
// function handleAddEventClick(e) {
//   console.log('add-event clicked!');
//   var $currentFighterId = $(this).closest('.fighter').data('fighter-id'); // "5665ff1678209c64e51b4e7b"
//   console.log('id:',$currentFighterId,'$(this):',this);
//   $('#eventModal').data('fighter-id', $currentFighterId);
//   $('#eventModal').modal();  // display the modal!
// }
//
// function handleNewEventSubmit(event) {
//   var $fighterId = $('#eventModal').data('fighter-id');
//   var $opponent = $('#opponent').val();
//   var $date  = $('#date').val();
//
//   var formData = {
//     opponent: $opponent,
//     date: $date,
//   };
//
// console.log("formData: "+ formData + 'Date: '+ $date+ 'Opponent: '+ $opponent +' for fighter w/ id: '+ fighterId);
//
//   // POST to SERVER
//   var eventPostToServerUrl = '/api/fighters/'+ fighterId + '/events';
//   $.post(eventPostToServerUrl, formData, function(event) {
//     console.log('received data from post to /event:', event);
//
//     // update the correct fighter to show the new event
//     $.get('/api/fighters/' + fighterId, function(fighter) {
//       // remove the current instance of the fighter from the page
//       $('[data-fighter-id=' + fighterId + ']').remove();
//       // re-render it with the new fighter data (including events)
//       renderFighter(data);
//     });
//   }).error(function(err) {
//     console.log('post to /api/fighters/:fighterId/events resulted in error', err);
//   });
//   $('#opponent').val('');
//   $('#date').val('');
//   $('#eventModal').modal('hide');
//
// }
//
// function handleEditEventsClick(e) {
//   //the below gathers
//   var $fighterRow = $(this).closest('.fighter');
//   var fighterId = $fighterRow.data('fighter-id');
//   console.log('edit events clicked for ', fighterId);
//
//   // fire zee modal!
//   $('#editEventsModal').modal();
//
// }
//
//
// function handleSaveChangesClick(event){
//   //when created mongoose generates an id this variable stores that random number
//   var fighterId = $(this).closest('.fighter').data('fighter-id');
//   //this vaiable assigns the fighterId to generated id to data-fighter-id atttribute
//   var $fighterRow = $('[data-fighter-id='+ fighterId + ']');
//   //this variable is capturing the value entered in the edit input
//   var data = {
//     birthName: $fighterRow.find('.edit-birthName').val(),
//     familyName: $fighterRow.find('.edit-familyName').val(),
//
//   };
//     console.log('PUTing data for fighter', fighterId, 'with data', data);
//
//     $.ajax({
//       method: 'PUT',
//       url: '/api/events/' + fighterId,
//       data: data,
//       success: handleFighterEditClick
//     });
//     // show the save changes button
//     $fighterRow.find('.save-fighter').toggleClass('hidden');
//     // hide the edit button
//     $fighterRow.find('.edit-fighter').toggleClass('hidden');
// }
//
//
// // function createnewEvent(sent) {
// //   sent.preventDefault();
// //   var formData = $(this).serialize();
// //   console.log('formData', formData);
// //   $.ajax({
// //     url:'api/events',
// //     method:"POST",
// //     data:formData,
// //     success: renderEvents(match),
// //       error: function(err){
// //         console.log('mistake made on event $.ajax call', err);
// //       }
// //   });
// //   $(this).trigger('reset');
// // }
