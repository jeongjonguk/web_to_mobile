!function() {
	var im_vk_writer = {
        selector: '.column-wrap'
        , content: ''
        , title : ''
        , topic: 'I\'m VK writer_在韓ブロガー連載コラム'
    };

    im_vk_writer.perform = function(doc) {
        // title text
        im_vk_writer.title = $(doc).find('.board-view-title h3').html();

        // select target element 
        $content = $(doc).find(im_vk_writer.selector);
        if ( $content.length === 0 ) {
            return im_vk_writer;
        }

         // anchor 
        fnMobileAnchor($content);

        // set style
        fnStyleSheetsChildren($content[0], doc.styleSheets, {
              'font-family': 'inherit'
            , 'font-size': ''
        });

        fn702pxTo100pcImg($content);

        // copy html text
        $($content[0]).each(function(i, v) {
            im_vk_writer.content += $(v).html();
        });

        return im_vk_writer;
    };
	
    this.im_vk_writer = im_vk_writer;
}();