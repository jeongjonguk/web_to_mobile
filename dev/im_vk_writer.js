!function() {
	var im_vk_writer = {
        selector: '.board-content'
        , content: undefined
        , title : ''
    };

    im_vk_writer.perform = function(doc) {
        // title text
        im_vk_writer.title = $(doc).find('.board-view-title h3').html();

        // select target element 
        $content = $(doc).find(im_vk_writer.selector);
        if ( $content.length === 0 ) {
            return im_vk_writer;
        }

        // copy html text
        $($content[0]).clone(true, true).each(function(i, v) {
            im_vk_writer.content += $(v).html();
        });

        return im_vk_writer;
    };
	
    this.im_vk_writer = im_vk_writer;
}();