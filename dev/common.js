var vrElementNames = [
    'html', 'body', 'div', 'span', 'object', 'iframe', 'h1', 'h2', 'h3', 'h4', 'h5'
  , 'h6', 'p', 'blockquote', 'pre', 'abbr', 'address', 'cite', 'code'
  , 'del', 'dfn', 'em', 'img', 'ins', 'kbd', 'q', 'samp', 'small', 'strong', 'sub'
  , 'sup', 'var', 'b', 'i', 'dl', 'dt', 'dd', 'ol', 'ul', 'li'
  , 'fieldset', 'form', 'label', 'legend', 'table', 'caption', 'tbody', 'tfoot', 'thead'
  , 'tr', 'th', 'td', 'article', 'aside', 'canvas', 'details'
  , 'figcaption', 'figure', 'footer', 'header', 'hgroup', 'menu', 'nav', 'section'
  , 'summary', 'time', 'mark', 'audio', 'video'
];

// --------------------------------------------------------------------------------
// fnIsEmpty
// --------------------------------------------------------------------------------
var fnIsEmpty = function(value) { 
    if ( value == "" ) { value += ''; } // 정수 0인 경우 
    if( value == "" || value == null || value == undefined ||
      ( value != null && typeof value == "object" && !Object.keys(value).length ) ) {
        return true 
    } else {
        return false 
    } 
};

// -----------------------------------------------------------------------------------
// 카멜 표기법 
// -----------------------------------------------------------------------------------
var fnCamelize = function(a, b) {
    return b.toUpperCase();
};

// -----------------------------------------------------------------------------------
//  parse css text
// -----------------------------------------------------------------------------------
var fnParseCssTxt = function(cssTxt, cssObj) {
    cssTxt = fnIsEmpty(cssTxt) === false ? cssTxt : '';
    cssObj = fnIsEmpty(cssObj) === false ? cssObj : {};
    cssTxt.split(";").forEach(function(b) {
        var p = b.trim().split(':');
        if ( p.length > 2 ) { p = [p.shift(), p.join(':')]; }
        if ( p.length == 2 ) {
            var camel = p[0].trim().replace(/\-([a-z])/g, fnCamelize);
            if ( fnIsEmpty(cssObj[camel]) === true || p[1].indexOf('!important') !== -1 ) {
                delete cssObj[camel];
                cssObj[camel] = b;
            } else if ( cssObj[camel].split(':')[1].indexOf('!important') === -1 ) {
                delete cssObj[camel];
                cssObj[camel] = b;
            }
        }
    });
    return cssObj;
};

// -----------------------------------------------------------------------------------
// ComputedStyle로부터 관심 스타일을 추출하여 element의 style attribute로 추가
// -----------------------------------------------------------------------------------
var fnComputedStyle = function($element, properties) {
    var allCss = $element.getStyleObject()
        cssTxt = $element.attr('style')
        cssObj = {}
        attr = '';

    if ( fnIsEmpty(cssTxt) === false ) {
        cssObj = fnParseCssTxt(cssTxt, cssObj);
    }
    
    if ( fnIsEmpty(properties) === false ) {
        properties.forEach(function(v) {
            var key = v.trim().replace(/\-([a-z])/g, fnCamelize);
                val = allCss[key];
            if ( fnIsEmpty(val) === false ) {
                delete cssObj[key];
                cssObj[key] = val;
            }
        });
    } else {
        cssObj = allCss;
    }

    for ( var key in cssObj ) { attr += cssObj[key] + ';'; }
    $element.attr('style', attr);
};

// -----------------------------------------------------------------------------------
// styleSheets로부터 스타일을 추출하여 element의 style attribute로 추가
// -----------------------------------------------------------------------------------
var fnStyleSheets = function(element, styleSheets, cssObjToApplyAfter, cssObjToApplyBefore, callbackBefore) {
    var cssTxt = $(element).attr('style')
        , cssObj = {}
        , keyArr = []
        , attr = '';

    // css 파일에 의해 적용된 특정 sytle이 제거되지 않도록 style attribute에 추가 
    if ( typeof callbackBefore !== undefined && $.isFunction(callbackBefore) ) {
        cssTxt = callbackBefore(element);
    }

    // css 파일에 의해 적용된 style 파싱
    getMatchedCSSRules(element, styleSheets).reverse().filter(function(v) {
        return v.selectorText.split(',').filter(function(w) { 
            // html element에 공통적으로 적용된 CSS는 제외   
            return vrElementNames.indexOf(w.trim()) !== -1; 
        }).length === 0; 
    })
    .forEach(function(v) {
        cssObj = fnParseCssTxt(v.style.cssText, cssObj);
    });

    // style attribute 보다 우선 순위가 낮은 스타일 적용  
    if ( fnIsEmpty(cssObjToApplyBefore) === false ) {
        for ( var key in cssObjToApplyBefore ) {
            var camel = key.trim().replace(/\-([a-z])/g, fnCamelize);
            delete cssObj[camel];
            cssObj[camel] = key + ':' + cssObjToApplyBefore[key];
        }
    }

    if ( fnIsEmpty(cssTxt) === false ) {
        cssObj = fnParseCssTxt(cssTxt, cssObj);
    }

    for ( var key in cssObj ) { attr += cssObj[key] + ';'; }
    $(element).attr('style', attr);

    // style attribute 보다 우선 순위가 높은 스타일 적용  
    if ( fnIsEmpty(cssObjToApplyAfter) === false ) {
        $(element).css(cssObjToApplyAfter);
    }
};

// -----------------------------------------------------------------------------------
// add css to children
// -----------------------------------------------------------------------------------
var fnStyleSheetsChildren = function(element, styleSheets, cssObjToApplyAfter, cssObjToApplyBefore, callbackBefore) {
    fnStyleSheets(element, styleSheets, cssObjToApplyAfter, cssObjToApplyBefore, callbackBefore);
    $(element).children().each(function(i, v) {
        fnStyleSheetsChildren(v, styleSheets, cssObjToApplyAfter, cssObjToApplyBefore, callbackBefore);
    });
};

// -----------------------------------------------------------------------------------
// mobile anchor
// -----------------------------------------------------------------------------------
var fnMobileAnchor = function($content) {
    $content.find('a').each(function(i, v) {
        var hrf = $(v).attr('href')
            , hrf = fnIsEmpty(hrf) === false ? hrf : ''
            , cid = hrf.indexOf('?cid=')
            , clk = $(v).attr('onclick');
        if ( cid !== -1 && fnIsEmpty(clk) === true ) {
            $(v).attr('onclick', 'innerUrlParser(\'' + hrf + '\'); return false;');
            $(v).attr('href', 'javascript:void(0);');
        }
    });
};

// -----------------------------------------------------------------------------------
// 702px to 100% image
// -----------------------------------------------------------------------------------
var fn702pxTo100pcImg = function($content) {
    $content.find('img').each(function(i, v) {
        if ( $(v).css('width') !== '100%' && $(v).css('max-width') === '702px' ) {
            $(v).css('width', '100%');
        }
    });
};

// -----------------------------------------------------------------------------------
// move caption to parent next
// -----------------------------------------------------------------------------------
var fnMoveImgCaption = function($content) {
    $content.find('img').siblings('.caption').each(function(i, v) {
        $(v).attr('style', 'color: #c00000; text-align: center; margin-bottom: 16px;');
        $(v).parent().after($(v));
    });
};

// -----------------------------------------------------------------------------------
// calculate minimum size and offset
// -----------------------------------------------------------------------------------
var fnMinSize = function(srcW, srcH, dstW, dstH) {
    var ratioW = dstW / srcW
        , ratioH = dstH / srcH;
    if ( srcH * ratioW >= dstH ) {
        return {
            width: (srcW * ratioW).toFixed(2)
            , height: (srcH * ratioW).toFixed(2)
            , x: 0
            , y: ((srcH * ratioW - dstH) / 2).toFixed(2)
            , ratioW: ratioW
            , ratioH: ratioH
        };
    } else if ( srcW * ratioH >= dstW ) {
        return {
            width: (srcW * ratioH).toFixed(2)
            , height: (srcH * ratioH).toFixed(2)
            , x: ((srcW * ratioH - dstW) / 2).toFixed(2)
            , y: 0
            , ratioW: ratioW
            , ratioH: ratioH
        };
    }
    return { width: 0, height: 0, x: 0, y: 0, ratioX: 0, ratioY: 0 };
};

// -----------------------------------------------------------------------------------
// resize and crop image by url
// -----------------------------------------------------------------------------------
var fnResizeAndCropByUrl = function(url, dstW, dstH, filename) {
    //  create a canvas and get its context.
    var cpCanvas = document.createElement('canvas')
        , cpContext = cpCanvas.getContext('2d')
        , rsCanvas = document.createElement('canvas')
        , rsContext = rsCanvas.getContext('2d')
        , filename = fnIsEmpty(filename) ? 'image.png' : filename
        , imageObj = new Image();

    imageObj.onload = function() {
        var minSize = fnMinSize(this.width, this.height, dstW, dstH)

        cpCanvas.width = minSize.width;
        cpCanvas.height = minSize.height;

        // set the dimensions at the wanted size.
        rsCanvas.width = minSize.width;
        rsCanvas.height = minSize.height;
        // resize the image with the canvas method drawImage();
        rsContext.drawImage(this, 0, 0, minSize.width, minSize.height);
        // draw cropped image
        cpContext.drawImage(rsCanvas, 0, 0, minSize.width, minSize.height, minSize.x, minSize.y, dstW, dstH);
        // download image
        var img = new Image()
            , a = document.createElement('a');
        img.src = cpCanvas.toDataURL();
        a.style = 'display: none';
        a.href = img.src;
        a.download = filename;
        document.body.appendChild(a);
        $('body').append(img);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            $('body').append(img);
        }, 1000);
    };
    imageObj.src = url;
};

// -----------------------------------------------------------------------------------
// is red color
// -----------------------------------------------------------------------------------
var isRedColor = function(rgbType){
    // 컬러값과 쉼표만 남기고 삭제
    var rgb = rgbType.trim().replace(/[^%,.\d]/g, "" ).split( ",");
    
    if ( rgb.length !== 3 ) { return false; }
    rgb.forEach(function (str, x, arr) { 
        // 컬러값이 "%"일 경우
        if ( str.indexOf( "%" ) > -1 ) {
            str = Math.round( parseFloat(str) * 2.55 ); 
        }
        arr[ x ] = str; 
    });

    return rgb[0] >= rgb[1] && rgb[0] >= rgb[2];
} 