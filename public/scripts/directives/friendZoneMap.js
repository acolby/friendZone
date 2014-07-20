'use strict';

angular.module('FriendZone').directive('friendZoneMap', [
	function(){
		return {
			templateUrl: 'views/directives/friendZoneMap.html',
			scope:{
				'friendZone': '='
			},
			replace: true,
			restrict: 'A',
			controller: ['$scope', 'SocketService', function($scope, socket) {
				$scope.mapReady = false;
				$scope.mapController = {};
				$scope.friends = [];
				$scope.map = {
					center: {
						latitude: 45,
						longitude: -73
					},
					zoom: 20
				};
				// watch friend zone and set map accordingly
				function refreshMap(){
					if(!$scope.friendZone){
						return;
					}
					// set center = to friend zone center
					if($scope.friendZone.centerLocation.coords.latitude){
						$scope.mapController.refresh(JSON.parse(JSON.stringify($scope.friendZone.centerLocation.coords)));
						$scope.mapReady = true;
					}
					// create the friends object
					for(var key in $scope.friendZone.friends){
						if($scope.friendZone.friends[key].location !== null){
							if($scope.friendZone.friends[key].location.coords){
								$scope.friends.push({
									'id':key,
									'location': $scope.friendZone.friends[key].location
								});
							}
						}
					}
				}
				$scope.$watch('friendZone',function(){
					refreshMap();
				});
				// calbacks
				$scope.eventListeners = {
					'bounds_changed': function(){
						refreshMap();
					}
				};
			}]
		};
	}
]);
