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

			$scope.friendZone = {
				'centerLocation': {
					'coords': {
						'latitude': 45,
						'longitude': -73
					}
				}
			};
			socket.on('friendZone: changed', function(friendZone) {
				$scope.friendZone = friendZone;
				refreshMap();
			});

			$scope.map = {
				center: {
					latitude: 45,
					longitude: -73
				},
				zoom: 20
			};
			//*** Handeling the map ** //
			$scope.mapReady = false;
			$scope.mapController = {};
			function refreshMap(){
				if($scope.friendZone.centerLocation.coords.latitude){
					$scope.mapReady = true;
					$scope.mapController.refresh(JSON.parse(JSON.stringify($scope.friendZone.centerLocation.coords)));
				}
				
			}

			$scope.eventListeners = {
				'bounds_changed': function(){
					refreshMap();
				}
			};

			$scope.centermap = function(){
				refreshMap();
			};

			
			

		}
	]);