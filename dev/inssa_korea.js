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

        $('.visual .label .household')

        fnComputedStyle($content.find('.label .household'), [
              'background-color'
            , 'background-repeat'
            , 'background-position'
            , 'background-size'
        ]);

        fnStyleSheetsChildren($content.find('.inssa .visual')[0], doc.styleSheets, 
            { 'font-family': 'inherit'}
        );

        var styleArr = fnParseCssTxt($content.find('.visual .txt').attr('style'));
        delete styleArr['padding'];
        styleArr['padding'] = 'padding: 10px !important';
        var ttt = '';
        for ( var key in styleArr ) {
            ttt += styleArr[key] + ';';
        }
        $content.find('.visual .txt').attr('style', ttt);
        // $content.find('.visual .txt').css('padding', '10px !important');

        inssa_korea.content += '<div class="visual">';
        inssa_korea.content += $content.find('.visual').html();
        inssa_korea.content += '</div>'
        inssa_korea.content += '<div class="inssa_box">';
        inssa_korea.content +=     '<div class="inssa-slide-wrap">';
        inssa_korea.content +=         '<ul>';
        $content.find('ul.slick-dots > li').each(function(i, v) {
            var $img = $content.find('ul.slick-slider div.slick-track li[aria-describedby="' + $(v).attr('id') + '"]');
            if ( $img.length !== 0 ) {
                inssa_korea.content +=     '<li>';
                inssa_korea.content +=         $img.html();
                inssa_korea.content +=         '<div class="descript">';
                inssa_korea.content +=             $content.find('.content .txt-w .txt:eq(' + i + ')').html();
                inssa_korea.content +=         '</div>'
                inssa_korea.content +=     '</li>';
            }
        });
        inssa_korea.content +=         '</ul>';
        inssa_korea.content +=     '</div>';
        inssa_korea.content += '</div>';

        return inssa_korea;
    };
	
    this.inssa_korea = inssa_korea;
}();