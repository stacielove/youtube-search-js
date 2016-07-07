//Searchbar handler - expands search input area by adding active class.
function searchToggle(obj,e){
        var searchBar = $(obj).closest('.w-search-bar');      
        if(!searchBar.hasClass('active')){
              searchBar.addClass('active');
              e.preventDefault();
        }
        else if(searchBar.hasClass('active') && $(obj).closest('.input-holder').length == 0){
              searchBar.removeClass('active');
              // clear input
              searchBar.find('.search-input').val('');
              // clear and hide result searchBar when we press close
              searchBar.find('.result-container').fadeOut(100, function(){$(this).empty();});
        }
    }

//Search function
function search(obj,e){
    searchVal = $(obj).find('.search-input').val().trim();
    searchResults = "You searched for: ";
  	// clear results list and buttons
  	$('#results').html('');
		$('#buttons').html('');

		// Get form input 
		var q = $('#query').val();

    if(!searchVal.length){
      searchResults = "You forgot to add some text!";
    }
    else{
      searchResults += "<b>" + searchVal + "</b>";
        	// Run GET Request on API
		$.get(
			"https://www.googleapis.com/youtube/v3/search", {
				part:'snippet,id',
				q: q,
				type:'video',
				key:'AIzaSyAaPtipSvH1JsJgvi6aAcNFP00YCjehasQ'},
				
				function(data) {
					var nextPageToken = data.nextPageToken;
					var previousPageToken = data.previousPageToken;
					
					console.log(data);

          // Loop through items returned in data
          // Build html output
          $.each(data.items, function(i,item){
              var output = getOutput(item);
              // Display results
              $('#results').append(output);

          });
          var buttons = getButtons(previousPageToken,nextPageToken);
          // Display buttons
          $('#buttons').append(buttons);
				}
			);

    }

    $(obj).find('.result-container').html('<span>' + searchResults + '</span>');
    $(obj).find('.result-container').fadeIn(100);

    e.preventDefault();
}

// Build output
function getOutput(item) {
	var videoId = item.id.videoId;
	var title = item.snippet.title;
	var description = item.snippet.description;
	var thumb = item.snippet.thumbnails.high.url; //hq thumbnail
	var channelTitle = item.snippet.channelTitle;
	var videoDate = item.snippet.publishedAt;

	// Build output string (all html goodness)
	var output = '<li class="list-group-item">'+
	'<div class="col-md-4">'+
	'<img src="'+thumb+'">'+
	'</div>'+
	'<div class="col-md-8">'+
	'<h3>'+title+'</h3>'+
	'<small>by <span class="chanTitle">'+channelTitle+'</span> on '+videoDate+'</small>'+
	'<p>'+description+'</p>'+
	'</div>'+
	'</li>'+
	'';

	return output

}

// Build buttons
function getButtons(previousPageToken,nextPageToken) {
	if(!previousPageToken) {
		var btnOutput = '<div class="btn-group">'+
										'<button type="button" id="next-button" class="btn btn-default" data-token="'+nextPageToken+'"'+
										'onclick="nextPage();">Next</button></div>';
	} else {
		var btnOutput = '<div class="btn-group">'+
										'<button type="button" id="prev-button" class="btn btn-default" data-token="'+previousPageToken+'"'+
										'onclick="previousPage();">Previous</button>'
										'<button type="button" id="next-button" class="btn btn-default" data-token="'+nextPageToken+'"'+
										'onclick="nextPage();">Next</button></div>';
	}
	return btnOutput;
}



