'use strict';

angular.module('FriendZone')
	.controller('HomeCtrl', ['$scope', 'SocketService',
		function($scope, socket) {

			// callbacks from the view
			$scope.newUserNameSubmitted = function() {
				if($scope.userName){
					socket.emit('add user', $scope.userName);
					$scope.hideLoginScreen = true;
					getLocation();
				}
			};

			
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

			// location stuff
			var x = document.getElementById('demo');
			function getLocation() {
			    if (navigator.geolocation) {
			        navigator.geolocation.getCurrentPosition(showPosition);
			    } else {
			        x.innerHTML = 'Geolocation is not supported by this browser.';
			    }
			}
			$scope.usersPosition = {'location': 'searching'};
			function showPosition(position) {
				$scope.usersPosition = position;
				$scope.$apply();
			}
		}
	]);