'use strict';

// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

var ChatRoom = require('./my_modules/chatRoom.js');
var FriendZone = require('./my_modules/friendZone.js');

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Serve The Front end
app.use(express.static(__dirname + '/public'));

// Chatroom

// usernames which are currently connected to the chat
var usernames = {};
var numUsers = 0;

// create fried zone and chatroom

var chatRoom = ChatRoom.create(1);
var friendZone = FriendZone.create(1);

io.on('connection', function (socket) {
  var addedUser = false;

  // add the user to the chatRoom and friendZone
  chatRoom.addPerson(socket.id);
  friendZone.addFriend(socket.id);

  // addChatRoomCallbacks

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
  });

  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {
    // we store the username in the socket session for this client
    socket.username = username;
    // add the client's username to the global list
    usernames[username] = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // echo globally (all clients) that a person has connected
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {
    console.log(socket.id);
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    chatRoom.removePerson(socket.id);
    friendZone.removeFriend(socket.id);
    // remove the username from global usernames list
    socket.broadcast.emit('user left', {
      username: socket.username,
      numUsers: numUsers
    });
  });

});
