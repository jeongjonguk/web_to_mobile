!function() {
	var travel_news = {
          selector: ['.board-content div:eq(0)', '.board-content']
        , content: ''
        , title : ''
        , topic: 'トピックス'
        , cids: []
        , lang: ''
    };

    travel_news.perform = function(doc, lang) {
        travel_news.lang = lang;
        
        // title text
        travel_news.title = $(doc).find('.board-view-title h3').html();

        // select target element 
        $content = undefined;
        travel_news.selector.forEach(function(v) {
            $content = $(doc).find(v);
            if ( $content.length > 0 ) {
                return false;
            }
        });
        
        if ( $content === undefined || $content.length === 0 ) {
            return travel_news;
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
        travel_news.cids = fnMobileAnchor($content, doc.styleSheets);

        $content.find('.lasttxt, .last_info, .last_txt').css({'color':'#ff5303'});
        $content.find('.notice').css({'color':'#cb0000'});

        // caption
        fnMoveImgCaption($content);

         // copy html text
        $($content[0]).each(function(i, v) {
            travel_news.content += $(v).html();
        });

        return travel_news;
    };
	
    this.travel_news = travel_news;
}();