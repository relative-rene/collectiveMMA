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

console.log('sanity check');
