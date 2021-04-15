!function() {
	var travel_highlights = {
          selector: '.board-content div:eq(0)'
        , content: ''
        , title : ''
        , topic: 'トピックス'
        , cids: []
        , lang: ''
    };

    travel_highlights.perform = function(doc, lang) {
        travel_highlights.lang = lang;
        
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
        travel_highlights.cids = fnMobileAnchor($content, doc.styleSheets);

        $content.find('.lasttxt, .last_info, .last_txt').css({'color':'#ff5303'});
        $content.find('.notice').css({'color':'#cb0000'});
        
        // caption
        fnMoveImgCaption($content);

        // img width
        fn702pxTo100pcImg($content, '.title_icon');

        // image height
        fnRemoveHeight100pc($content);

        $content.find('.container img.title_icon').each(function(i, v) {
            var html = '';
            $(v).attr('style', '');
            html += '<div style="width: 100%; text-align: center; margin: 37px 0 10px 0;">';
            html += $(v)[0].outerHTML;
            html += '</div>';
            $(v)[0].outerHTML = html;
        });

        // visual image
        var $title = $content.find('.visual p.title')
            , $titleSpan = $title.find('span')
            , titleStyle = $title.attr('style')
            , spanStyle = $titleSpan.attr('style');
        $title.attr('style', titleStyle + '; background-size: cover; font-size: 42px !important;');
        $titleSpan.attr('style', spanStyle + '; font-size: 42px !important;');
        $content.find('.visual').css('padding', '0 0 32px 0');

        // slider
        $content.find('.slider-w').each(function(a, b) {
            var html = '<div style="overflow-x: auto; overflow-y: hidden; z-index: 101; width: 100%; padding: 10px; counter-reset: my-sec-counter;">';
            html += '<ul style="display: flex; list-style-type: none; padding-left: 0; margin-left: 0;">';
            $(b).find('ul.slick-dots > li').each(function(i, v) {
                var $li = $(b).find('ul.slick-slider div.slick-track li[aria-describedby="' + $(v).attr('id') + '"]')
                    , $img = $li.find('img')
                    , $dsc = $li.find('p');
                if ( $img.length !== 0 ) {
                    $img.attr('style', 'max-width: 300px; width: 270px;' + (i !== 0 ? 'margin-left: 10px;' : ''));
                    html += '<li>';
                    html +=     $img[0].outerHTML;
                    html +=         '<div class="descript" style="text-align: center;">';
                    html +=             '<strong>' + $dsc.html() + '</strong>';
                    html +=         '</div>'
                    html += '</li>';
                }
            });
            html += '</ul></div>'
            $(b).html(html);
        });

        // dt style
        $content.find('.box-w p.title').css('text-align', 'left');
        $content.find('.box-w dl').css('padding', '0');
        $content.find('.box-w dt, .box-w dd').css('padding', '0 0 0 26px');
        $content.find('.box-w dt.address').css('background', 'url(http://tong.visitkorea.or.kr/img/vk/enu/inssaKorea/images/column/icon_address.png) left center no-repeat');
        $content.find('.box-w dt.directions').css('background', 'url(http://tong.visitkorea.or.kr/img/vk/enu/inssaKorea/images/column/icon_directions.png) left center no-repeat');
        $content.find('.box-w dt.operating').css('background', 'url(http://tong.visitkorea.or.kr/img/vk/enu/inssaKorea/images/column/icon_operating.png) left center no-repeat');
        $content.find('.box-w dt.fees').css('background', 'url(http://tong.visitkorea.or.kr/img/vk/enu/inssaKorea/images/column/icon_fees.png) left center no-repeat');
        $content.find('.box-w dt.inquiries').css('background', 'url(http://tong.visitkorea.or.kr/img/vk/enu/inssaKorea/images/column/icon_inquiries.png) left center no-repeat');
        $content.find('.box-w dt.website').css('background', 'url(http://tong.visitkorea.or.kr/img/vk/enu/inssaKorea/images/column/icon_website.png) left center no-repeat');
        $content.find('.box-w dt.facilities').css('background', 'url(http://tong.visitkorea.or.kr/img/vk/enu/inssaKorea/images/column/icon_facilities.png) left center no-repeat');

         // copy html text
        $($content[0]).each(function(i, v) {
            travel_highlights.content += $(v).html();
        });

        return travel_highlights;
    };
	
    this.travel_highlights = travel_highlights;
}();