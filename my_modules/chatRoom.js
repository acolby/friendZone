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
				var that = this;
				if(addPerson(this, userId)){
					history.trackKeyAction(userId, {
						'name': 'added',
						'userId': userId
					});
					callFunctionList(that.onPersonAddedFunctions, userId);
				}
			},
			'removePerson': function(userId){
				var that = this;
				if(removePerson(this, userId)){
					history.trackKeyAction(userId, {
						'name': 'removed',
						'userId': userId
					});
					callFunctionList(that.onPersonRemovedFunctions, userId);
				}
			},
			'addMessage': function(userId, message){
				var that = this;
				if(addMessage(this, userId, message)){
					var now = new Date();
					history.trackKeyAction(userId, {
						'name': 'message added',
						'userId': userId,
						'message': message
					});
					callFunctionList(that.onMessageAddedFunctions, userId, message);
				}
			},
			'getPeopleTotal': function(){
				var i = 0;
				for(var person in this.people){
					i++;
				}
				return i;
			},
			'onPersonAddedFunctions': [],  // userId
			'onPersonAdded': function(functionToCall){
				this.onPersonAddedFunctions.push(functionToCall);
			},
			'onPersonRemovedFunctions': [], // userId
			'onPersonRemoved': function(functionToCall){
				this.onPersonRemovedFunctions.push(functionToCall);
			},
			'onMessageAddedFunctions': [], // userId, message
			'onMessageAdded': function(functionToCall){
				this.onMessageAddedFunctions.push(functionToCall);
			}
		};
		history.trackAction({
			'name': 'created'
		});
		return chatRoom;
	}
};