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

			// handeling location stuff
			function getLocation() {
			    if (navigator.geolocation) {
			        navigator.geolocation.getCurrentPosition(showPosition);
			    }
			}
			$scope.usersPosition = {'location': 'searching'};
			function showPosition(position) {
				$scope.usersPosition = position;
				socket.emit('friendZone: modify location', position);
				$scope.$apply();
			}

			$scope.friends = {};
			socket.on('friendZone: changed', function(friends){
				$scope.friends = friends;
			});

			// make map happen

			$scope.map = {
			    center: {
			        latitude: 45,
			        longitude: -73
			    },
			    zoom: 8
			};
		    
		}
	]);