var express = require('express');
var app = express();

app.use(express.static('public'));

app.get('/', function(req, res){
  res.sendfile("public/index.html");
});

app.get('/api', function(req, res){
  res.json({"message" : "Hello there."});
});

app.get('/category', function(req, res){
});


app.post('/', function(req, res){
  res.send("This is a POST request.");
});

app.delete('/', function(req, res){
  res.send("This is a delete request");
});

app.post('/users', function(req, res){

});

/*app.get('/users/:id:name', function(req, res){
  var user_id = req.params.id;
  var user_name = req.params.name;
  res.send("The name is: " + user_id " - " + user_name);
});*/

app.listen(3000, function(){
  console.log('Example app listening on port 3000');
});
