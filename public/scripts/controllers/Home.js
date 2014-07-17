'use strict';

angular.module('FriendZone')
	.controller('HomeCtrl', ['$scope', 'SocketService',
		function($scope, socket) {

			$scope.chatDisplayObject = [];
			function addChatMessage(username, message){
				$scope.chatDisplayObject.push({
					'type': 'chatMessage',
					'contents': {
						'username': username,
						'style': {
							'color': getUsernameColor(username)
						},
						'message': message
					}
				});
			}

			// callbacks from the view
			$scope.newUserNameSubmitted = function() {
				if($scope.userName){
					socket.emit('add user', $scope.userName);
					$scope.hideLoginScreen = true;
				}
			};

			$scope.newMessageSubmitted = function() {
				if($scope.newMessage){
					addChatMessage($scope.userName, $scope.newMessage);
				    socket.emit('new message', $scope.newMessage);
				    $scope.newMessage = '';
				}
			};

			socket.on('login', function(data) {
				$scope.chatDisplayObject.push({
					'type': 'message',
					'contents': {
						'message': 'chat here!'
					}
				});
			});

			// Whenever the server emits 'new message', update the chat body
			socket.on('new message', function(data) {
				addChatMessage(data.username, data.message);
			});

			/*
				// Whenever the server emits 'user joined', log it in the chat body
				socket.on('user joined', function(data) {
					log(data.username + ' joined');
					addParticipantsMessage(data);
				});

				// Whenever the server emits 'user left', log it in the chat body
				socket.on('user left', function(data) {
					log(data.username + ' left');
					addParticipantsMessage(data);
					removeChatTyping(data);
				});

				// Whenever the server emits 'typing', show the typing message
				socket.on('typing', function(data) {
					addChatTyping(data);
				});

				// Whenever the server emits 'stop typing', kill the typing message
				socket.on('stop typing', function(data) {
					removeChatTyping(data);
				});
			*/

			// Suport functions
			// Gets the color of a username through our hash function

			var COLORS = [
				'#e21400', '#91580f', '#f8a700', '#f78b00',
				'#58dc00', '#287b00', '#a8f07a', '#4ae8c4',
				'#3b88eb', '#3824aa', '#a700ff', '#d300e7'
			];
			function getUsernameColor(username) {
				// Compute hash code
				var hash = 7;
				for (var i = 0; i < username.length; i++) {
					hash = username.charCodeAt(i) + (hash < 5) - hash;
				}
				// Calculate color
				var index = Math.abs(hash % COLORS.length);
				return COLORS[index];
			}

		}
	]);