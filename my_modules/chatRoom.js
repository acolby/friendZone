'use strict';
var historyTracker = require('./historyTracker');

function addPerson(chatRoom, userId){
	// check if the Person already exists
	if(chatRoom.people[userId] === undefined){
		chatRoom.people[userId] = [];
		chatRoom.people[userId].push({
			'id': userId,
			'status': null
		});
	}
	return true;
}

function removePerson(chatRoom, userId){
	// check if the Person already exists
	if(chatRoom.people[userId] !== undefined){
		delete chatRoom.people[userId];
	}
	return true;
}

function addMessage(chatRoom, userId, message){
	chatRoom.messages.push(message);
	return true;
}

module.exports = {
	//public methods
	create: function(id){

		var history = historyTracker.create();

		var chatRoom = {
			'id': id,
			'people': {/*
				[
					{
						'id': userId,
						'location': null,
						'status': null,
						'lastUpdated': null
					}
				]*/
			},
			'messages': [],
			'history': {
				'actions': history.actions,
				'keys': history.keys
			},
			'addPerson': function(userId){
				if(addPerson(this, userId)){
					history.trackKeyAction(userId, {
						'name': 'added',
						'userId': userId
					});
				}
			},
			'removePerson': function(userId){
				if(removePerson(this, userId)){
					history.trackKeyAction(userId, {
						'name': 'removed',
						'userId': userId
					});
				}
			},
			'addMessage': function(userId, message){
				if(addMessage(this, userId, message)){
					var now = new Date();
					history.trackKeyAction(userId, {
						'name': 'message added',
						'userId': userId,
						'message': message
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
		return chatRoom;
	}
};