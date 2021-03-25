!function() {
	var inssa_korea_activity = {
            selector: '.board-content'
          , category: 'shopping'
          , content: ''
          , title : ''
          , topic: ''
	};

    inssa_korea_activity.perform = function(doc) {
        // title text
        inssa_korea_activity.title = $(doc).find('.board-view-title h3').html();

        // topic 
        inssa_korea_activity.topic = $(doc).find('.inssa .visual .visual-con .label div:eq(0) p').html();

        // select target element 
        var $content = $(doc).find(inssa_korea_activity.selector);
        if ( $content.length === 0 ) {
            return inssa_korea_activity;
        }

        var $household = $content.find('.inssa .visual .visual-con .label > span')
            , $label = $content.find('.inssa .visual-con .label')
            , imageSrc = $content.find('.inssa .visual .visual-con').children('img').attr('src')
            , contentTxt = $content.find('.inssa .visual .txt').html();

        // computed background style
        fnComputedStyle($household , [
            'background-color'
          , 'background-repeat'
          , 'background-position'
          , 'background-size'
        ]);

        // stylesheet 
        fnStyleSheetsChildren($label[0], doc.styleSheets, { 'font-family': 'inherit'});

        var html = '';
        html += '<div id="TSTSTS" class="inssa ' + inssa_korea_activity.category + '">';
        html +=     $label[0].outerHTML;
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