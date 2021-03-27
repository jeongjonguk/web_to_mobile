!function() {
	var inssa_korea_food = {
            selector: '.board-content'
          , category: 'shopping'
          , content: ''
          , title : ''
          , topic: ''
	};

    inssa_korea_food.perform = function(doc) {
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

        // household to computed background style
        fnComputedStyle($content.find('.inssa .visual .visual-con .label > span') , [
              'background-color'
            , 'background-repeat'
            , 'background-position'
            , 'background-size'
        ]);

        // clone after applying computed style
        $content = $content.clone(true, true);

        var $label = $content.find('.inssa .visual-con .label')
            , imageSrc = $content.find('.inssa .visual .visual-con').children('img').attr('src')
            , contentTxt = $content.find('.inssa .visual .txt').html()
            , addTxt = $content.find('.content .add-txt').html()
            , tip =  $content.find('.content .tip').html();

        // stylesheet 
        fnStyleSheetsChildren($label[0], doc.styleSheets, { 'font-family': 'inherit'});
        $label.find('span:eq(0)').next('div:eq(0)').css('padding-top', '15px');

        var html = '';
        html += '<div id="TSTSTS" class="inssa ' + inssa_korea_food.category + '">';
        html +=     $label[0].outerHTML;
        html +=     '<div>';
        html +=         '<img alt="" src="' + imageSrc + '" width="100%">';
        html +=     '</div>';
        html +=     '<div class="visual">';
        html +=         '<strong>' + contentTxt + '</strong>';
        html +=     '</div>';
        html +=     '<div class="inssa_box">';
        html +=         '<p class="inssa_tit" style="text-align: center;">';
        html +=             '<strong>HOW TO</strong>';
        html +=         '</p>';
        html +=         '<div class="inssa-slide-wrap">';
        html +=             '<ul>';
        $content.find('ul.slick-dots > li').each(function(i, v) {
            var $slideImg = $content.find('ul.slick-slider div.slick-track li[aria-describedby="' + $(v).attr('id') + '"]');
            if ( $slideImg.length !== 0 ) {
                html +=         '<li>';
                html +=             $slideImg.html();
                html +=             '<div class="descript">';
                var $txt = $content.find('.content .txt-w .txt:eq(' + i + ')')
                html +=                 '<strong>' + $txt.html() + '</strong>';
                html +=             '</div>'
                html +=         '</li>';
            }
        });
        html +=             '</ul>';
        html +=         '</div>';
        html +=     '</div>';
        if ( fnIsEmpty(addTxt) === false ) {
            html += '<div>';
            html +=     '<strong>' + addTxt + '</strong>';
            html += '</div>';
        }
        if ( fnIsEmpty(tip) === false ) {
            html += '<div class="tip_box">';
            html +=     tip;
            html += '</div>';
        }
        html += '</div>';

        inssa_korea_food.content = html;
        return inssa_korea_food;
    };
	
    this.inssa_korea_food = inssa_korea_food;
}();