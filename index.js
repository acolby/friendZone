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

// create fried zone and chatroom
var chatRoom = ChatRoom.create(1);
var friendZone = FriendZone.create(1);
var sessionInfo = {
  'users': {},
  'addUser': function(userId, userName){
    if(this.users[userId] === undefined){
      this.users[userId] = {
        'id': userId,
        'name': (userName !== undefined)?(null):(undefined)
      };
    }
    return true;
  },
  'setUsername': function(userId, userName){
    if(this.users[userId] !== undefined){
      this.users[userId].name = userName;
    }
    return true;
  },
  'removeUser': function(userId){
    if(this.users[userId] !== undefined){
      delete this.users[userId];
    }
    return true;
  }
};
io.on('connection', function (socket) {
  // add the user to users
  sessionInfo.addUser(socket.id);

  // Genral socket calls
  socket.on('add user', function (username) {
    socket.username = username;
    sessionInfo.setUsername(socket.id, username);
    chatRoom.addPerson(socket.id);
    friendZone.addFriend(socket.id);

    socket.emit('login', {
      numUsers: chatRoom.getPeopleTotal()
    });
  });
   // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    chatRoom.removePerson(socket.id);
    friendZone.removeFriend(socket.id);
  });

  // ************ Chatroom calls **************/
  socket.on('new message', function (message) {
    chatRoom.addMessage(socket.id, message);
  });
  socket.on('typing', function () {});
  socket.on('stop typing', function () {});

  // add chatRoom callbacks
  chatRoom.onPersonAdded(function(userId){
    socket.emit('user joined', {
      'username': sessionInfo.users[userId].name,
      'numUsers': chatRoom.getPeopleTotal()
    });
  });
  chatRoom.onPersonRemoved(function(userId){
    socket.emit('user left', {
      'username': sessionInfo.users[userId].name,
      'numUsers': chatRoom.getPeopleTotal()
    });
  });
  chatRoom.onMessageAdded(function(userId, message){
    socket.emit('new message', {
      'username': sessionInfo.users[userId].name,
      'message': message
    });
  });

  // ************ FriendZone calls **************/
  friendZone.onFriendAdded(function(friends){
    socket.emit('friendZone: changed', friends);
  });
  friendZone.onFriendRemoved(function(friends){
    socket.emit('friendZone: changed', friends);
  });
  friendZone.onLocationChange(function(friends){
    socket.emit('friendZone: changed', friends);
  });
  friendZone.onStatusChange(function(friends){
    socket.emit('friendZone: changed', friends);
  });

  socket.on('friendZone: modify location', function (location) {
    friendZone.addLocation(socket.id, location);
  });

});
