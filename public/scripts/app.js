console.log('Sanity Check: js is working');
var template;

$(document).ready(function(){

$('#score-card-form').on('submit', function(event) {
  alert('ScoreCard submit clicked');
  console.log(event);
  event.preventDefault();
  var formData= $('formData')
});





//////////helper functions



////event Listener function
$(".dropdown-menu li a").click(function(event){

  $(this).parents(".btn-group").find('.selection').text($(this).text());
  $(this).parents(".btn-group").find('.selection').val($(this).text());
    event.preventDefault();
});

});
