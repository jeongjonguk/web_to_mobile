!function() {
	var inssa_korea_food = {
            selector: '.board-content'
          , content: ''
          , title : ''
          , topic: ''
          , cids: []
          , lang: ''
	};

    inssa_korea_food.perform = function(doc, lang) {
        inssa_korea_food.lang = lang;

        // title text
        inssa_korea_food.title = $(doc).find('.board-view-title h3').html();

        // topic 
        inssa_korea_food.topic = $(doc).find('.inssa .visual .visual-con .label div:eq(0) p').html();

        // select target element 
        var $content = $(doc).find(inssa_korea_food.selector);
        if ( $content.length === 0 ) {
            console.log('No select target element!')
            return inssa_korea_food;
        }

        // clone after applying computed style
        $content = $content.clone(true, true);

        var   category = $('#visit-web-site-category-select').val()
            , type = $content.find('.inssa .visual-con .label div:eq(0) p').html()
            , imageSrc = $content.find('.inssa .visual .visual-con').children('img').attr('src')
            , contentTxt = $content.find('.inssa .visual .txt').html()
            , $inssaBox = $content.find('div.box-line')
            , addTxt = $content.find('.content .add-txt').html()
            , tip =  $content.find('.content .tip').html()
            , html = '';

        // anchor 
        inssa_korea_food.cids = fnMobileAnchor($content, doc.styleSheets);

        html += '<div class="inssa ' + category + '">';
        html +=     '<img alt="" class="inssa_level" src="' + label_image.get(category, inssa_korea_food.lang, type) + '"></img>';
        html +=     '<div>';
        html +=         '<img alt="" src="' + imageSrc + '" width="100%">';
        html +=     '</div>';
        html +=     '<div class="visual">';
        html +=         '<strong>' + contentTxt + '</strong>';
        html +=     '</div>';
        $inssaBox.each(function(h, u) {
            html += '<div class="inssa_box">';
            html +=     '<p class="inssa_tit" style="text-align: center;">';
            html +=         '<strong>' + $(u).find('.title > p').html() + '</strong>';
            html +=     '</p>';
            html +=     '<div class="inssa-slide-wrap">';
            html +=         '<ul>';
            $(u).find('ul.slick-dots > li').each(function(i, v) {
                var $slideImg = $content.find('ul.slick-slider div.slick-track li[aria-describedby="' + $(v).attr('id') + '"]');
                if ( $slideImg.length !== 0 ) {
                    html +=     '<li>';
                    html +=             $slideImg.html();
                    html +=         '<div class="descript">';
                    // var $txt = $content.find('.content .txt-w .txt:eq(' + i + ')');
                    var $txt = $(u).next().find('.txt:eq(' + i + ')');
                    html +=             '<strong>' + $txt.html() + '</strong>';
                    html +=         '</div>'
                    html +=     '</li>';
                }
            });
            html +=         '</ul>';
            html +=     '</div>';
            html += '</div>';
        });
        if ( fnIsEmpty(addTxt) === false ) {
            html += '<div>';
            html +=     '<strong>' + addTxt + '</strong>';
            html += '</div>';
        }
        if ( fnIsEmpty(tip) === false ) {
            html += '<div class="tip_box type02">';
            html +=     tip;
            html += '</div>';
        }
        html += '</div>';

        inssa_korea_food.content = html;
        return inssa_korea_food;
    };
	
    this.inssa_korea_food = inssa_korea_food;
}();