!function() {
	var inssa_korea = {
            selector: '.board-content'
          , content: ''
          , title : ''
	};

    inssa_korea.perform = function(doc) {
        // title text
        inssa_korea.title = $(doc).find('.board-view-title h3').html();

        // select target element 
        $content = $(doc).find(inssa_korea.selector);
        if ( $content.length === 0 ) {
            return inssa_korea;
        }

        // copy html text
        $($content[0]).clone(true, true).each(function(i, v) {
            inssa_korea.content += $(v).html();
        });

        return inssa_korea;
    };
	
    this.inssa_korea = inssa_korea;
}();