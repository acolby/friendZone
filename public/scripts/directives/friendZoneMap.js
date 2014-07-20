'use strict';

angular.module('FriendZone').directive('friendZoneMap', [
	function(){
		return {
			templateUrl: 'views/directives/friendZoneMap.html',
			scope:{},
			replace: true,
			restrict: 'A',
			controller: ['$scope', 'SocketService', function($scope, socket) {
				$scope.mapController = {};
				$scope.map = {
					center: {
						latitude: 45,
						longitude: -73
					},
					zoom: 20
				};
				function initalize(){
					
				}
				initalize();
			}]
		};
	}
]);
