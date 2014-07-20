'use strict';

angular.module('FriendZone')
	.controller('HomeCtrl', ['$scope', 'SocketService', 'geolocation',
		function($scope, socket, geolocation) {

			// callbacks from the view
			$scope.newUserNameSubmitted = function() {
				if ($scope.userName) {
					socket.emit('add user', $scope.userName);
					$scope.hideLoginScreen = true;
					getUsersLocation();
				}
			};

			// handeling location stuff
			function getUsersLocation(){
				geolocation.getLocation().then(function(position){
					$scope.usersPosition = position;
					socket.emit('friendZone: modify location', position);
		    	});
			}
			socket.on('friendZone: changed', function(friendZone) {
				$scope.friendZone = friendZone;
			});

		}
	]);