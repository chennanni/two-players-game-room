var localPlayer;
var remotePlayer;

$(function () {
  var socket = io();
  var self = this;

  // chat msg function
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function(msg){
    $('#messages').append($('<li>').text(msg));
    window.scrollTo(0, document.body.scrollHeight);
  });

  // register local player
  socket.on('newLocalPlayer', function (player) {
    localPlayer = player.playerId;
    alert("local player: " + localPlayer);
  });

  // register remote player
  socket.on('newRemotePlayer', function (player) {
    remotePlayer = player.playerId;
    alert("remote player: " + remotePlayer);
  });

});
