// private support methods
function addFriend(friendZone, userId){
	// check if the friend already exists
	if(friendZone.friends[userId] === undefined){
		friendZone.friends.push({
			'id': userId,
			'location': null,
			'status': null,
			'lastUpdated': null
		});
	}
	history_friendAdded(friendZone, userId);
	return true;
}
function removeFriend(friendZone, userId){
	// check if the friend already exists
	if(friendZone.friends[userId] !== undefined){
		delete friendZone.friends[userId];
	}
	history_friendRemoved(friendZone, userId);
	return true;
}
function addLocation(friendZone, userId, location, dateTime){
	// check if the user exists if not add them
	if(friendZone.friends[userId] === undefined){
		addFriend(friendZone, userId);
	}
	
	history_friendAddedLocation(friendZone, userId, location);
}

// private support methods for modifiying a friendZone's history
function history_friendZoneCreated(friendZone, dateTime){
	var occuredAt = (dateTime !== undefined)?(dateTime):(new Date());
	friendZone.history.general.push({
		'time': occuredAt,
		'action': 'created'
	});
}
function history_friendAdded(friendZone, userId, dateTime){
	var occuredAt = (dateTime !== undefined)?(dateTime):(new Date());
	friendZone.history.general.push({
		'time': occuredAt,
		'action': 'user ' + userId + ' added'
	});
	var userHistoryObject = {
		'time': occuredAt,
		'action': 'added'
	};
	if(friendZone.history.friends[userId] === undefined){
		friendZone.history.friends[userId] = [];
	}
	friendZone.history[userId].push(userHistoryObject);
}
function history_friendRemoved(friendZone, userId, dateTime){
	var occuredAt = (dateTime !== undefined)?(dateTime):(new Date());
	friendZone.history.general.push({
		'time': occuredAt,
		'action': 'user ' + userId + ' removed'
	});
	var userHistoryObject = {
		'time': occuredAt,
		'action': 'removed'
	};
	if(friendZone.history.friends[userId] === undefined){
		friendZone.history.friends[userId] = [];
	}
	friendZone.history[userId].push(userHistoryObject);
}
function history_friendAddedLocation(friendZone, userId, location, dateTime){
	var occuredAt = (dateTime !== undefined)?(dateTime):(new Date());
	friendZone.history.general.push({
		'time': occuredAt,
		'action': 'user ' + userId + ' added location ' + printLocation(location)
	});
	var userHistoryObject = {
		'time': occuredAt,
		'action': 'added location ' + printLocation()
	};
	if(friendZone.history.friends[userId] === undefined){
		friendZone.history.friends[userId] = [];
	}
	friendZone.history[userId].push(userHistoryObject);
}

// small support methods
function printLocation(location){
	return JSON.stringify(location);
}

module.exports = {
	//public methods
	create: function(radius){
		var friendZone = {
			'friends': {/*
				[
					{
						'id': userId,
						'location': null,
						'status': null,
						'lastUpdated': null
					}
				]*/
			},
			'currentCenterLocation': null,
			'history':{
				'general':[],
				'friends':{}
			},
			'radius': radius,
			'addFriend': function(userId){
				return addFriend(this, userId);
			},
			'removeFriend': function(userId){
				return removeFriend(this, userId);
			},
			'addLocation': function(userId, dateTime){
				return addLocation(this, userId, dateTime);
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
		history_friendZoneCreated(friendZone);
		return friendZone;
	},
	addFriend: function(){

	}
};