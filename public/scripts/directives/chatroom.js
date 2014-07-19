'use strict';

angular.module('FriendZone').directive('chatroom', [
	function(){
		return {
			templateUrl: 'views/directives/chatroom.html',
			scope:{
				'username': '='
			},
			restrict: 'A',
			controller: ['$scope', 'SocketService', function($scope, socket) {
				function initalize(){
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
					$scope.newMessageSubmitted = function() {
						if($scope.newMessage){
							//addChatMessage($scope.userName, $scope.newMessage);
						    socket.emit('new message', $scope.newMessage);
						    $scope.newMessage = '';
						}
					};
					socket.on('new message', function(data) {
						addChatMessage(data.username, data.message);
					});
					socket.on('login', function(data) {
						$scope.chatDisplayObject.push({
							'type': 'message',
							'contents': {
								'message': 'chat here!'
							}
						});
					});
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
				$scope.$watch('username', function(){
					initalize();
				});
			}]
		};
	}
]);
