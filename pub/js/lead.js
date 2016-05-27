var db = firebase.database();
var saver = db.ref("/scores");

var act = 0;

$(document).ready(function(){
  var cont = saver.orderByChild("score");

  cont.on('value', function(snap)
  {
    snap.forEach(function(childsnapshot)
    {
      /*
      Print out the headers for each category
      */
      $("#mainlead").slideDown(2000);
      switch (act)
      {
        case 0: $("#leaddiv").append("<h3>Art n'Fashion</h3>");
          break;
        case 1: $("#leaddiv").append("<h3>Food n'Sports</h3>");
          break;
        case 2: $("#leaddiv").append("<h3>Games n'Music</h3>");
          break;
      }
      act++;
      childsnapshot.forEach(function(childofchildsnap)
      {
        /*
        Print out scores
        */
        var st = childofchildsnap.val().playername + " : " + childofchildsnap.val().score + ".00";
        $("#leaddiv").append("<p>" + st + "</p>");
      });
    });
  });
});
