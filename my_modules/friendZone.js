'use strict';

var historyTracker = require('./historyTracker');

function addFriend(friendZone, userId){
	// check if the friend already exists
	if(friendZone.friends[userId] === undefined){
		friendZone.friends[userId] = {};
		friendZone.friends[userId] = {
			'id': userId,
			'location': null,
			'status': null,
			'lastUpdated': null
		};
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
	if(friendZone.friends[userId] !== undefined){
		friendZone.friends[userId].location = location;
	}
	return true;
}

// support methods
function callFunctionList(){
	var functionList = arguments[0];
	var parameter1 = (arguments[1] === undefined)?(undefined):arguments[1];
	var parameter2 = (arguments[2] === undefined)?(undefined):arguments[2];
	var parameter3 = (arguments[3] === undefined)?(undefined):arguments[3];
	var parameter4 = (arguments[4] === undefined)?(undefined):arguments[4];
	var parameter5 = (arguments[5] === undefined)?(undefined):arguments[5];
	var parameter6 = (arguments[6] === undefined)?(undefined):arguments[6];
	for(var i = 0; i < functionList.length; i ++){
		if(functionList === undefined){
			// remove it from the list
			functionList.splice(i, 1);
			i--;
		}else{
			functionList[i](parameter1, parameter2, parameter3, parameter4, parameter5, parameter6);
		}
	}
}

module.exports = {
	//public methods
	create: function(id, radius){

		var history = historyTracker.create();

		var friendZone = {
			'id': id,
			'friends': {/*
				'userId': 
					{  // [FRIEND_ZONE_USER_OBJECT]
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
				var that = this;
				if(addFriend(this, userId)){
					history.trackKeyAction(userId, {
						'name': 'added',
						'userId': userId
					});
					callFunctionList(that.onFriendAddedFunctions, that.friends);
				}
			},
			'removeFriend': function(userId){
				var that = this;
				if(removeFriend(this, userId)){
					history.trackKeyAction(userId, {
						'name': 'removed',
						'userId': userId
					});
					callFunctionList(that.onFriendRemovedFunctions, that.friends);
				}
			},
			'addLocation': function(userId, location){
				var that = this;
				if(addLocation(this, userId, location)){
					var now = new Date();
					history.trackKeyAction(userId, {
						'name': 'location added',
						'userId': userId,
						'location': location
					});
					callFunctionList(that.onLocationChangeFunctions, that.friends);
				}
			},
			'onFriendAddedFunctions': [], // friends
			'onFriendAdded': function(functionToCall){
				this.onFriendAddedFunctions.push(functionToCall);
			},
			'onFriendRemovedFunctions': [], // friends
			'onFriendRemoved': function(functionToCall){
				this.onFriendRemovedFunctions.push(functionToCall);
			},
			'onLocationChangeFunctions': [], // friends
			'onLocationChange': function(functionToCall){
				this.onLocationChangeFunctions.push(functionToCall);
			},
			'onStatusChangeFunctions': [], // friends
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