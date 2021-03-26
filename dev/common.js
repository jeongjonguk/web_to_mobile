
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
var fnParseCssTxt = function(a, s) {
    s = fnIsEmpty(s) === false ? s : {};
    a.split(";").forEach(function(b) {
        var p = b.trim().split(':');
        if ( p.length > 2 ) { p = [p.shift(), p.join('|')]; }
        if ( p.length == 2 ) {
            var camel = p[0].trim().replace(/\-([a-z])/g, fnCamelize);
            if ( fnIsEmpty(s[camel]) === true || p[1].indexOf('!important') !== -1 ) {
                delete s[camel];
                s[camel] = b;
            } else if ( s[camel].split(':')[1].indexOf('!important') === -1 ) {
                delete s[camel];
                s[camel] = b;
            }
        }
    });
    return s;
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
    
    properties.forEach(function(v) {
        var key = v.trim().replace(/\-([a-z])/g, fnCamelize);
            val = allCss[key];
        if ( fnIsEmpty(val) === false ) {
            delete cssObj[key];
            cssObj[key] = val;
        }
    });

    for ( var key in cssObj ) { attr += cssObj[key] + ';'; }
    $element.attr('style', attr);
};

// -----------------------------------------------------------------------------------
// styleSheets로부터 스타일을 추출하여 element의 style attribute로 추가
// -----------------------------------------------------------------------------------
var fnStyleSheets = function(element, styleSheets, cssObjToApply) {
    var cssTxt = $(element).attr('style')
        , cssObj = {}
        , keyArr = []
        , attr = '';
    getMatchedCSSRules(element, styleSheets).reverse().filter(function(v) {
        return v.selectorText.split(',').filter(function(w) { 
            // html element에 공통적으로 적용된 CSS는 제외   
            return vrElementNames.indexOf(w.trim()) !== -1; 
        }).length === 0; 
    })
    .forEach(function(v) {
        cssObj = fnParseCssTxt(v.style.cssText, cssObj);
    });

    if ( fnIsEmpty(cssTxt) === false ) {
        cssObj = fnParseCssTxt(cssTxt, cssObj);
    }

    for ( var key in cssObj ) { attr += cssObj[key] + ';'; }
    $(element).attr('style', attr);

    if ( fnIsEmpty(cssObjToApply) === false ) {
        $(element).css(cssObjToApply);
    }
};

// -----------------------------------------------------------------------------------
// add css to children
// -----------------------------------------------------------------------------------
var fnStyleSheetsChildren = function(element, styleSheets, cssObjToApply) {
    fnStyleSheets(element, styleSheets, cssObjToApply);
    $(element).children().each(function(i, v) {
        fnStyleSheetsChildren(v, styleSheets, cssObjToApply);
    });
};

// -----------------------------------------------------------------------------------
// mobile anchor
// -----------------------------------------------------------------------------------
var fnMobileAnchor = function($content) {
    $content.find('a').each(function(i, v) {
        var hrf = $(v).attr('href'), clk = $(v).attr('onclick');
        if ( fnIsEmpty(hrf) === false && fnIsEmpty(clk) === true ) {
            $(v).attr('onclick', 'innerUrlParser(\'' + hrf + '\'); return false;');
            $(v).attr('href', 'javascript:void(0);');
        }
    });
}

// -----------------------------------------------------------------------------------
// 702px to 100% image
// -----------------------------------------------------------------------------------
var fn702pxTo100pcImg = function($content) {
    $content.find('img').each(function(i, v) {
        if ( $(v).css('width') !== '100%' && $(v).css('max-width') === '702px' ) {
            $(v).css('width', '100%');
        }
    });
}