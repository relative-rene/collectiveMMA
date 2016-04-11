console.log('Sanity Check: js is working');
var template;

$(document).ready(function(){


//////////helper functions

winner();
});
// event Listener function
function winner(){
  var rounds = 0, fighter1Total = 0, fighter2Total = 0;
    $(".dropdown-menu li a").click(function(event){
      $(this).parents(".btn-group").find('.selection').text($(this).text());
      $(this).parents(".btn-group").find('.selection').val($(this).text());
        console.log(this);
        event.preventDefault();
        rounds++;
  if(rounds === 10){
    var fighter1 = $('.fighter1').each(function(roundScore) {
        console.log(fighter1.val());
        fighter1Total += roundScore;
        console.log('fighter1total',fighter1Total);
      });
    var fighter2 = $('.fighter2').each(function(roundScore) {
        console.log(fighter2.val());
        fighter2Total += roundScore;
        console.log('fighter2total',fighter2Total);
    });
  }
});
}


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
