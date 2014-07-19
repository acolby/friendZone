'use strict';

var historyTracker = require('./historyTracker');

function addFriend(friendZone, userId){
	// check if the friend already exists
	if(friendZone.friends[userId] === undefined){
		friendZone.friends[userId] = [];
		friendZone.friends[userId].push({
			'id': userId,
			'location': null,
			'status': null,
			'lastUpdated': null
		});
	}
	return true;
}

function removeFriend(friendZone, userId){
	// check if the friend already exists
	if(friendZone.friends[userId] !== undefined){
		delete friendZone.friends[userId];
	}
	return true;
}

function addLocation(friendZone, userId, location){
	// check if the user exists if not add them
	if(friendZone.friends[userId] === undefined){
		addFriend(friendZone, userId);
	}
	return true;
}

module.exports = {
	//public methods
	create: function(id, radius){

		var history = historyTracker.create();

		var friendZone = {
			'id': id,
			'friends': {/*
				'userId':
					{
						'id': userId,
						'location': null,
						'status': null,
						'lastUpdated': null
					}...*/
			},
			'currentCenterLocation': null,
			'history': {
				'actions': history.actions,
				'keys': history.keys
			},
			'radius': radius,
			'addFriend': function(userId){
				if(addFriend(this, userId)){
					history.trackKeyAction(userId, {
						'name': 'added',
						'userId': userId
					});
				}
			},
			'removeFriend': function(userId){
				if(removeFriend(this, userId)){
					history.trackKeyAction(userId, {
						'name': 'removed',
						'userId': userId
					});
				}
			},
			'addLocation': function(userId, location){
				if(addLocation(this, userId, location)){
					var now = new Date();
					history.trackKeyAction(userId, {
						'name': 'location added',
						'userId': userId,
						'location': location
					});
				}
			},
			'onLocationChangeFunction': [],
			'onLocationChange': function(functionToCall){
				this.onLocationChangeFunction.push(functionToCall);
			},
			'onStatusChangeFunctions': [],
			'onStatusChange': function(functionToCall){
				this.onStatusChangeFunctions.push(functionToCall);
			}
		};
		history.trackAction({
			'name': 'created'
		});
		return friendZone;
	},
	addFriend: function(){

	}
};