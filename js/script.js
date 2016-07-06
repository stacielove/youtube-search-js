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
function submitFn(obj,e){
    searchVal = $(obj).find('.search-input').val().trim();
    searchRes = "You searched for: ";
    if(!searchVal.length){
        searchRes = "You forgot to add some text!";
    }
    else{
        searchRes += "<b>" + searchVal + "</b>";
    }

    $(obj).find('.result-container').html('<span>' + searchRes + '</span>');
    $(obj).find('.result-container').fadeIn(100);

    e.preventDefault();
}





