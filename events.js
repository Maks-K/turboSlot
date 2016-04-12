var events = {};

function addListener(eventName, functionCallback){
	if(!events[eventName]){
		events[eventName] = [];
	}

	events[eventName].push(functionCallback);
	//console.log(eventName, functionCallback)
}

function fireEvent(event, params){
	console.error(event, params);

	if(events[event]){
		for(var i = 0; i < events[event].length; i++){
			events[event][i](params);
		}
	}
}



