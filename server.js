var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

var players = new Array();

// publish public folder
app.use("/public", express.static(__dirname + "/public"));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/login.html');
});
app.get('/alice', function(req, res){
  if (players.length < 2) {
    res.sendFile(__dirname + '/index.html');
  } else {
    res.sendFile(__dirname + '/error.html');
  }
});
app.get('/bob', function(req, res){
  if (players.length < 2) {
    res.sendFile(__dirname + '/index.html');
  } else {
    res.sendFile(__dirname + '/error.html');
  }
});

http.listen(port, function(){
  console.log('listening on *:' + port);
  console.log('start...');
});

io.on('connection', function(socket){
  if (players.length < 2) {
    // register player
    console.log('a user connected, id: ' + socket.id);
    var player = {
      playerId: socket.id
    };
    players.push(player);
    // send the players object to the new player
    socket.emit('newLocalPlayer', player);
    // update all other players of the new player
    socket.broadcast.emit('newRemotePlayer', player);

    // disconnect event
    socket.on('disconnect', function(){
      console.log('user disconnected, id: ' + socket.id);
      // remove this player from our players
      for (var i in players){
        if (players[i].playerId == socket.id) {
          players.splice(i,i+1);
        }
      }
      delete player;
      // emit a message to all players to remove this player
      io.emit('disconnect', socket.id);
    });

    // chat event
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });
  } else {
    console.log('already reach max user limit: 2, can not connect more...');
  }
});
