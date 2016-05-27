var express = require('express');
var app = express();

var firebase = require("firebase");

firebase.initializeApp({
  serviceAccount: {
  "type": "service_account",
  "project_id": "quizapp-a4360",
  "private_key_id": "29775747788cd36e7a52047fb8dbc2c3e11c0b9f",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCz2DwG8fgfASYk\nFfwrqv12Kwyqc+Dj307tOqzXRinyA6J4+JIemDmM9/CuBv0VOoUTgzHTbEq3FLO4\nJ2pnShj9lmqtdZcrmzRzuWHbge5eIBW/iPMszDN/mNXHH2YOMmmgdWCiLWQAqSSH\niUmftOZmBJhG8Oe5WL1ZSJNElR6zju6Ulav5NyjE6e390XukncOD7UMew0sC5L6q\nolkacmGgu/IjwA1bmgI8nm9mvfEr/N5lgIaJNgNDREceLGTb5lTWDazmamjkZX2v\n+pRsQpEOznEg1Uzufh5BXn4aSxEhhW/VPR4jZUcPC7Y54N7D1q7yRu5MuMKtrOMn\np7skNaIDAgMBAAECggEALGJbPiONZqlz7kf2uhgzAWzSbWa3w8Uix21Jpr9MLswy\n1sQR27cZzO6L2YckAo80tIIWU+VP8ysKx5ICsocY78ylezWgH0Tohv7jZbcFSvmE\nJIb57L5gn0bqy3+2Qh6y7sTJGn01Rux3dXOuVdnhWqAbrLZbmeSKpnRA1BYxQ4LC\nyLl0JBLfOHO3aaW6o8c1vEpW8j1B0JKfcIqdNj4b9qFuBFcl0SxDQvtheLS8/qf5\n2BP1xZ1QzpnhtEfsMg5AoI8YEoVIWdcJPKlk3+Vmm9N0OU2ne4ereosBjcIirAh1\ntyMNPqBLwZLWAE1iE/FcOFET5iMxrv8DMV9m+gRmEQKBgQDj3k359e1lmGXaxw8M\nCRjknNwEoxy5mmNWofHt0jeQ7g7p7lznqAOb6h73GTmsb5mqmB1pthxN2qBYXKhB\nJ2IzgNRSxcR/KeOL+NFpf1/amU9cKFwY/B0bVbYB0B/zP0giDshUvk5/HiXcazLV\nDsf8YCd5go0EQas7ov7aW//ttwKBgQDKDCiITE1JkC9dzg5Pa+Enp8lNeoobz1EB\nKn8ijisECCfw6d6yeDM3IrAFzXdDQfWaLRXoF8azWjnhjYsYoD/WhH2PaQX5cZUc\nTBdSOKpDNm/rA8bHWU4g7UPRlwB4OgDAFyqMRdIEyRDIYPBp+6ia7dc24i4nCocE\nW8BEIIHuFQKBgFjzW78auEwzfHc1w3LwTi5X6S9KORle4i5cU2OB7zz9IQdCjDPG\nC3qenu3YhAIDIppMfRbaBxyBHpy/ttKQPC5cuQWCvBzjzjbCr4SeO13LAQa5npIG\nQJp+D+mPRBmhd1gMKzmhfGT08NSlaBdxiLHFG0O8qa2isOQ70X6N8U7rAoGBAKrJ\nTjWv8aCeDTvIopYFxYOEs4cXbsiFHJ7UsjSeYcP9tO1Sctj++6O+YXX2MLqcdaOG\nOr894crXGJgM0ifVxUBqK8xeZRtuJDGQLCJnHZzE1iOcxJjbZ0wz4qC2eEIoHVxB\n+MgreJRs9Q+7yVx8yg9zvfh5hbOglXJcsA+mPs3lAoGAEIODzWJcw+VrMVpIAUoG\nR9JYo2qs5u6La3w70VUiOGjLvQzfZ5L/7WMRutIJRE1sqOqGiVSKrclqBYJ7gsyb\nSK9gMUhA9EAAZtloMY0IFHk2aorX/nVce2XVjEvaK/fJJjMhrxRn3y484jNDPz3P\ngI1Pe0F+8Wshe6KHKz6wFts=\n-----END PRIVATE KEY-----\n",
  "client_email": "quizapp-a4360@appspot.gserviceaccount.com",
  "client_id": "100438714999869651564",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/quizapp-a4360%40appspot.gserviceaccount.com"
},
databaseURL: "https://quizapp-a4360.firebaseio.com/"
});

var db = firebase.database();
var saver = db.ref("/scores");
var qa = db.ref("/category");

app.use(express.static('pub'));

app.get('/', function(req, res){
  res.sendfile("pub/index.html");
});

app.get('/api', function(req, res){
  res.json({"message" : "Hello there."});
});

app.get('/scores/:playername', function(req, res)
{
  var temp = db.ref("/category/playername");
  temp.orderByChild().orderByChild("playername").equalTo(req.params.playername).on('value', function(snap)
  {
    res.send(snap.val());
  });
});

/*
Get all the questions
*/
app.get('/questions', function(req, res){
  qa.on('value', function(snap)
  {
    res.send(snap.val());
  });
});

app.get('/questions/:cat_id', function(req, res)
{
  qa.orderByKey().equalTo(req.params.cat_id).on('value', function(snap)
  {
    if(snap.val() !== null)
    {
      res.send(snap.val());
    }
    else
    {
      res.json({"Oh Oh!" : "No such category exists"});
    }
  }, function(errorobject)
  {
      res.json(404 , {status: 404, message : "No Such Category Exists", type: "user"});
  });
});

app.listen(3000, function(){
  console.log('Example app listening on port 3000');
});
