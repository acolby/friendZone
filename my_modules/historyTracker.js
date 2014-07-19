'use strict';

function trackAction(history, actionObject, dateTime){
	var occuredAt = (dateTime !== undefined)?(dateTime):(new Date());
	history.actions.push({
		'time': occuredAt,
		'action': actionObject
	});
}

function trackKeySpecificAction(history, key, actionObject, dateTime){
	var occuredAt = (dateTime !== undefined)?(dateTime):(new Date());
	var keyAction = {
		'time': occuredAt,
		'action': actionObject
	};
	if(history.keys[key] === undefined){
		history.keys[key] = [];
	}
	history.keys[key].push(keyAction);
}

module.exports = {
	//public methods
	create: function(){
		var history = {
			'actions':[],
			'keys':{},
			'trackAction': function(actionObject, dateTime){
				trackAction(history, actionObject);
			},
			'trackKeyAction': function(key, actionObject, dateTime){
				trackKeySpecificAction(history, key, actionObject);
			}
		};
		return history;
	}
};