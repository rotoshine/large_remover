(function(){
  var REMOVE_TARGET = '-large';
  var DOT = '.';

  var options;

  function loadStoredOptions(){
  	return chrome.storage.sync.get({
  		usingDateName: false
  	}, function(loadedOptions){
      options = loadedOptions;
    });
  }

  loadStoredOptions();

  function getFomattedDateString(){
  	var current = new Date();
  	return current.getFullYear() + '년' +
  	 (current.getMonth() + 1) + '월' +
  	 current.getDate() + '일' +
  	 current.getHours() + '시' +
  	 current.getMinutes() + '분';
  }

  function removeLargeSuffix(downloadItem){
    var paths = downloadItem.filename.split('.');
  	var fileExt = paths[paths.length - 1];

  	var REMOVE_TARGET = '-large';

  	if(fileExt.indexOf(REMOVE_TARGET) > -1){
  		fileExt = fileExt.replace(REMOVE_TARGET, '');
  	}

    var dotAndFileExt = DOT + fileExt;

  	// TODO 일단은 if로 처리하고 이후엔 option parser 만들어서 우아하게 처리하자..
    if(options){
      console.log(options);
      console.log(typeof options.usingDateName);
    }
  	if(options && options.usingDateName){
      return getFomattedDateString() + dotAndFileExt;
  	}else{
  		paths.pop();
  		return paths.join(DOT) + dotAndFileExt;
  	}
  }

  chrome.downloads.onDeterminingFilename.addListener(function(downloadItem, suggest){
    return suggest({
      filename: removeLargeSuffix(downloadItem)
    });
  });

  chrome.storage.onChanged.addListener(function(changes) {
    options.usingDateName = changes.usingDateName.newValue;
  });
})();
