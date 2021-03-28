!function() {
	var travel_highlights = {
          selector: '.board-content div:eq(0)'
        , content: ''
        , title : ''
        , topic: 'トピックス'
    };

    travel_highlights.perform = function(doc) {
        // title text
        travel_highlights.title = $(doc).find('.board-view-title h3').html();

        // select target element 
        $content = $(doc).find(travel_highlights.selector);
        if ( $content.length === 0 ) {
            return travel_highlights;
        }

        // set style
        fnStyleSheetsChildren($content[0], doc.styleSheets
            , {'font-family': 'inherit', 'font-size': ''}
            , {}
            , function(ele) {
                var $ele = $(ele)
                    , cssTxt = $ele.attr('style')
                    , cssObj = fnParseCssTxt(cssTxt)
                    , attr = '';
                if ( ele.nodeName === 'SPAN' && fnIsEmpty(cssObj['color']) == true ) {
                    var allCss = $ele.getStyleObject(), color = allCss['color'];
                    if ( isRedColor(color.split(':')[1]) === true ) {
                        cssTxt += + ';' + color + ';';
                        $ele.attr('style', cssTxt);
                    }
                }
                return cssTxt;
            }
        );

        // clone
        $content = $content.clone(true, true);

        // anchor 
        fnMobileAnchor($content);

        $content.find('.lasttxt, .last_info, .last_txt').css({'color':'#ff5303'});
        $content.find('.notice').css({'color':'#cb0000'});

        // caption
        fnMoveImgCaption($content);

         // copy html text
        $($content[0]).each(function(i, v) {
            travel_highlights.content += $(v).html();
        });

        return travel_highlights;
    };
	
    this.travel_highlights = travel_highlights;
}();