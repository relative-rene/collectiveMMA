console.log('Sanity Check: js is working');
var template;

$(document).ready(function(){







//////////helper functions



////event Listener function
$(".dropdown-menu li a").click(function(event){

  $(this).parents(".btn-group").find('.selection').text($(this).text());
  $(this).parents(".btn-group").find('.selection').val($(this).text());
    event.preventDefault();
});

});
