!function() {
	var inssa_korea_activity = {
            selector: '.board-content'
          , content: ''
          , title : ''
          , topic: ''
          , cids: []
          , lang: ''
	};

    inssa_korea_activity.perform = function(doc, lang) {
        inssa_korea_activity.lang = lang;

        // title text
        inssa_korea_activity.title = $(doc).find('.board-view-title h3').html();

        // topic 
        inssa_korea_activity.topic = $(doc).find('.inssa .visual .visual-con .label div:eq(0) p').html();

        // select target element 
        var $content = $(doc).find(inssa_korea_activity.selector);
        if ( $content.length === 0 ) {
            return inssa_korea_activity;
        }

        // clone after applying computed style
        $content = $content.clone(true, true);

        var   category = $('#visit-web-site-category-select').val()
            , type = $content.find('.inssa .visual-con .label div:eq(0) p').html()
            , imageSrc = $content.find('.inssa .visual .visual-con').children('img').attr('src')
            , contentTxt = $content.find('.inssa .visual .txt').html()
            , html = '';

        // anchor 
        inssa_korea_activity.cids = fnMobileAnchor($content);

        // apply style of anchor in the dd element(word break)
        $content.find('.tip dl dd a').each(function(i, v) {
            fnStyleSheets($(v)[0], doc.styleSheets);
        });

        html += '<div class="inssa ' + category + '">';
        html +=     '<img alt="" class="inssa_level" src="' + label_image.get(category, inssa_korea_activity.lang, type) + '"></img>';
        html +=     '<div>';
        html +=         '<img alt="" src="' + imageSrc + '" width="100%">';
        html +=     '</div>';
        html +=     '<div class="visual">';
        html +=         '<strong>' + contentTxt + '</strong>';
        html +=     '</div>';
        html +=     '<div class="inssa_box">';
        html +=         '<div class="inssa-slide-wrap">';
        html +=             '<ul>';
        $content.find('ul.slick-dots > li').each(function(i, v) {
            var $slideImg = $content.find('ul.slick-slider div.slick-track li[aria-describedby="' + $(v).attr('id') + '"]');
            if ( $slideImg.length !== 0 ) {
                html +=         '<li>';
                html +=             $slideImg.html();
                html +=             '<div class="descript">';
                var $txt = $content.find('.content .txt-w .txt:eq(' + i + ')')
                    , tit = $txt.find('strong:eq(0)').html()
                    , tip_tit = $txt.find('.tip-tit').html()
                    , tip = $txt.find('.tip').html()
                    , $clone = $txt.clone(true, true);
                $clone.find('.tip-tit').remove();
                $clone.find('.tip').remove();
                $clone.find('strong').remove();;
                html += '<strong style="padding: 10px 0 20px 0; display: inline-block;">' + tit + '</strong>';
                html += '<strong>' + $clone.html() + '</strong>';
                if ( fnIsEmpty(tip_tit) === false ) {
                    html += '<div class="tip_tit" style="padding: 20px 0 5px 0;">' + tip_tit + '</div>';
                }
                if ( fnIsEmpty(tip) === false ) {
                    html += '<div class="tip_box type02">' + tip + '</div>';
                }
                html +=             '</div>'
                html +=         '</li>';
            }
        });
        html +=             '</ul>';
        html +=         '</div>';
        html +=     '</div>';
        html += '</div>';

        inssa_korea_activity.content = html;
        return inssa_korea_activity;
    };
	
    this.inssa_korea_activity = inssa_korea_activity;
}();