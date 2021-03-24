!function() {
	var travel_highlights = {
        selector: '.board-content'
        , content: undefined
        , title : ''
    };

    travel_highlights.perform = function(doc) {
        // title text
        travel_highlights.title = $(doc).find('.board-view-title h3').html();

        // select target element 
        $content = $(doc).find(travel_highlights.selector);
        if ( $content.length === 0 ) {
            return travel_highlights;
        }

        // copy html text
        $($content[0]).clone(true, true).each(function(i, v) {
            travel_highlights.content += $(v).html();
        });

        return travel_highlights;
    };
	
    this.travel_highlights = travel_highlights;
}();