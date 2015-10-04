function saveOptions(){
	chrome.storage.sync.set({
		usingDateName: $('#using-date-name').is(':checked')
	}, function(){
		console.log('options saved!');
	});
}

function loadOptions(callback){
	return chrome.storage.sync.get({
		usingDateName: false
	}, callback);
}

// document events
loadOptions(function(item){
	$('#using-date-name').attr('checked', item.usingDateName)
});

$('#using-date-name').on('click', saveOptions);
