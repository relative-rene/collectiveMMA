console.log('Sanity Check: js is working');
var template;

$(document).ready(function(){
  $('#Submit-total').on('click',function(){
    var fighter1Total = 0, fighter2Total = 0;
    var fighter1 = $('.fighter1').each(function(index,fighter1button) {
        console.log('fighter1 total',fighter1Total);
        fighter1Total += fighter1button;
        console.log('fighter1total',fighter1Total);
      });
    var fighter2 = $('.fighter2').each(function(index, fighter2button) {
        console.log('fighter2button',fighter2button);
        fighter2Total += fighter2button;
        console.log('fighter2total',fighter2Total);
    });
  });



// event Listener function
  $(".dropdown-menu li a").click(function(event){
    var $linkText= $(this).text();
    $(this).parents(".btn-group").find('.selection').text($linkText);
    console.log(this);
    event.preventDefault();
});
});




// function fighterDisplay(){
//   $.ajax({
//     url:'http://ufc-data-api.ufc.com/api/v1/us/fighters',
//     method: 'POST',
//     success:
//     error:function(err){
//       console.log(err)
//     }
//   });


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
