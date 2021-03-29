!function() {
	var im_vk_writer = {
        selector: '.board-content div:eq(0)'
        , content: ''
        , title : ''
        , topic: 'I\'m VK writer_在韓ブロガー連載コラム'
        , thumbWidth: 332
        , thumbHeight: 240
    };

    im_vk_writer.perform = function(doc) {
        // title text
        im_vk_writer.title = $(doc).find('.board-view-title h3').html();

        // select target element 
        $content = $(doc).find(im_vk_writer.selector);
        if ( $content.length === 0 ) {
            return im_vk_writer;
        }

        // clone
        $content = $content.clone(true, true);

        // anchor 
        fnMobileAnchor($content);

        // set style
        fnStyleSheetsChildren($content[0], doc.styleSheets, {
              'font-family': 'inherit'
            , 'font-size': ''
        });

        // caption
        fnMoveImgCaption($content);

        // img width
        fn702pxTo100pcImg($content);

        // copy html text
        $($content[0]).each(function(i, v) {
            im_vk_writer.content += $(v).html();
        });

        // thumb image -> p:not(.jp_bnr) img:not([alt="banner"]):eq(0)
        var $thumbImg = $(doc).find(im_vk_writer.selector + ' img:not([alt="banner"]):eq(0)');
        fnResizeAndCropByUrl($thumbImg.attr('src'), 
                im_vk_writer.thumbWidth, 
                im_vk_writer.thumbHeight);

        return im_vk_writer;
    };
	
    this.im_vk_writer = im_vk_writer;
}();