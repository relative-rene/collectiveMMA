$(document).ready(function() {
$('#fighterBuilder-form form').on('submit', function(e) {
  e.preventDefault();
  var formData = $(this).serialize();
  console.log('formData', formData);

  $.post('/api/fighters', formData, function(fighter) {
    console.log('album after POST', fighter);
    renderFighter(fighter);
  }).error(function(){
    console.log('their was an error with your post',fighter);
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
console.log('sanity check');
