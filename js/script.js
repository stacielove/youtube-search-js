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
				key:'YOUTUBE-API-KEY-HERE'},
				
				function(data) {
					var nextPageToken = data.nextPageToken;
					var previousPageToken = data.previousPageToken;
					
					console.log(data);

				}
			);

    }

    $(obj).find('.result-container').html('<span>' + searchResults + '</span>');
    $(obj).find('.result-container').fadeIn(100);

    e.preventDefault();
}



