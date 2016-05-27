var db = firebase.database();
var main = db.ref("/category");
var saver = db.ref("/scores");

var playname = "";
var total = [];
var ans = [];
var cor = [];
var cat_id;
var i = 0;
var t = 0;
var count = 0;
var act = 0;

$(document).ready(function()
{
  /*
  This event goes off once the start button is clicked
  */
  $('#startbutton').click(function()
  {

    playname = $('#playername').val();
    if(playname !== "")
    {
      $('#beginning').slideUp(1000);

      /*
      Store players name in localStorage
      */
      localStorage.setItem("playername", playname);
      $('#user').append("Player:" + playname);
      $('#user').slideDown(1000);
      $('#user').animate(
      {
        left: "100px",
        height: '30px',
        width: '30px',
      }, 1000);

      $('#category').slideDown(2000);
    }
    else
    {
        $('#warn').slideDown();
    }
  });

  /*
  This event goes off once the NEXT button is clicked
  */
  $('#next').click(function()
  {
    /*
    an if statement that allows the printing of 10 questions
    */
    if(i < 9)
    {
      /*
      Get the selected radio button and store it in the localStorage
      */
      var a = $('input[name=opt]:checked', '#form').val();
      localStorage.setItem(i, a);
      ans.push(a);
      i++;
      var next = total[i];

      $('#questions').slideUp(1000, function()
      {
        $('#mainquestion').empty();
        $('#form').empty();

        /*
        Print out next question
        */
        var st = next.val().question;
        var z = next.val().options;
        $('#mainquestion').append(st);
        $('#mainquestion').slideDown(100);
        var opt = "<input type=\"radio\" name=\"opt\" value=\"a\" /> " + z.a  + "<br/><input type=\"radio\" name=\"opt\" value=\"b\" />" + z.b + "<br/><input type=\"radio\" name=\"opt\"   value=\"c\" /> " + z.c + "<br/><input type=\"radio\" name=\"opt\" value=\"d\" /> " + z.d;
        $('#form').append(opt);
        if(i === 9)
        {
          /*
          Change button value to done on 10th question
          */
          $('#next').empty();
          $('#next').append("Done");
        }
        $('#questions').slideDown(1200);
      });
    }
    else
    {
      /*
      Print out results on done
      */
      $('#user').animate({
        left: "500px",
        height: '30px',
        width: '30px',
      }, 1000);

      $('#questions').slideUp(1000);
      for(var q = 0; q <= i; q++)
      {
        /*
        Check for correct and chosen answers
        */
        var next = total[q];
        var st = next.val().question;
        var z = next.val().options;
        var o1 = z.a;
        var o2 = z.b;
        var o3 = z.c;
        var o4 = z.d;
        var optans = next.val().answer;

        /*
        Count correct answers
        */
        if(cor[q] === ans[q])
        {
          count++;
        }

        /*
        show chosen answers
        */
        switch (ans[q])
        {
          case "a": o1 = o1 + " <b style=\"color:#00AFDE\">chosen</b>";
            break;
          case "b": o2 = o2 + " <b style=\"color:#00AFDE\">chosen</b>";
            break;
          case "c": o3 = o3 + " <b style=\"color:#00AFDE\">chosen</b>";
            break;
          case "d": o4 = o4 + " <b style=\"color:#00AFDE\">chosen</b>";
            break;
          default: break;
        }

        /*
        show correct answers
        */
        switch (optans)
        {
          case "a": o1 = o1 + " <b style=\"color:#21DE44\">correct</b>";
            break;
          case "b": o2 = o2 + " <b style=\"color:#21DE44\">correct</b>";
            break;
          case "c": o3 = o3 + " <b style=\"color:#21DE44\">correct</b>";
            break;
          case "d": o4 = o4 + " <b style=\"color:#21DE44\">correct</b>";
            break;
          default: break;
        }

        /*
        print out questions with chosen and correct answers shown
        */
        var opt = "<br/><li><p>" + st +"</p><br/><ul><li>" + o1  + "</li><br/><li>" + o2 + "</li><br/><li>" + o3 + "</li><br/><li>" + o4 + "</li></ul></li>";
        $('#resultlist').append(opt);
      }
      var collect = saver.child(cat_id);
      collect.push({
        playername : playname,
        score: count
      });
      $('#finalans').append("You got: " + count + "/10");
      $('#results').slideDown();
    }
  });

  /*
  This is to show the leader board
  */
  $('#lead').click(function()
  {
    
    $('#main').slideUp(2000, function()
    {
      var cont = saver.orderByChild("score");

      cont.on('value', function(snap)
      {
        snap.forEach(function(childsnapshot)
        {
          /*
          Print out the headers for each category
          */
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
            var st = childofchildsnap.val().playername + " - " + childofchildsnap.val().score;
            $("#leaddiv").append("<p>" + st + "</p>");
          });
        });
        $("#mainlead").slideDown(2000);
        localStorage.clear();
      },
      function(errorobject)
      {
        console.log("The read failed: ", errorobject.code);
      });
    });
  });

  /*
  Prints out the first question while storing the rest in an array
  */
  $('button').click(function()
  {
    if(this.id !== 'startbutton' && this.id !== 'next' && this.id !== 'lead')
    {
      /*
      Checks for the category and stores it in the localStorage
      */
      if(t == 0)
      {
        cat_id = this.id;
        localStorage.setItem("category", cat_id);
      }

      $('#category').slideUp(2300);
      $('#questions').slideDown(1200);

      /*
      Gets all objects that are in the category
      */
      var cont = undefined;
      cont = main.orderByKey().equalTo(cat_id);

      cont.on('value', function(snap)
      {
        snap.forEach(function(childsnapshot)
        {
          childsnapshot.forEach(function(childofchildsnap)
          {
            if(t == 0)
            {
              /*
              Prints out the firstquestion
              */
              var st = childofchildsnap.val().question;
              var z = childofchildsnap.val().options;
              $('#mainquestion').append(st);
              $('#mainquestion').slideDown(100);
              var opt = "<input type=\"radio\" name=\"opt\" value=\"a\" /> " + childofchildsnap.val().options.a  + "<br/><input type=\"radio\" name=\"opt\" value=\"b\" />" + childofchildsnap.val().options.b + "<br/><input type=\"radio\" name=\"opt\" value=\"c\" /> " + childofchildsnap.val().options.c + "<br/><input type=\"radio\" name=\"opt\" value=\"d\" /> " + childofchildsnap.val().options.d;
              $('#form').append(opt);
              t++;
              $('#form').slideDown(1500);

              total.push(childofchildsnap);
              cor.push(childofchildsnap.val().answer);
            }
            else
            {
              /*
              Stores other questions in the array
              */
              total.push(childofchildsnap);
              cor.push(childofchildsnap.val().answer);
              t++;
            }
          });
        });
      },
      function(errorobject)
      {
        console.log("The read failed: ", errorobject.code);
      });
    }
  });
});
