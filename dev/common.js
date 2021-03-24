var gPageSize = 10;
var gElasticSearchWindowSize = 10000;
var gIntMaxValue = 2147483647;
var gPageSizeAllData = gIntMaxValue;
var gExcelDownloadSize = gIntMaxValue;
var gContextPath = '';
var gVersionPath = '/v1'
var gServerAddress = window.location.origin;
gServerAddress = (
	! gServerAddress 
	? window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '')
	: gServerAddress
);


$(document).ready(function(){
    //getLoginName();
});

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

// --------------------------------------------------------------------------------
// fnPad
// --------------------------------------------------------------------------------
var fnPad = function(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
};

//--------------------------------------------------------------------------------
//fnAddComma
//--------------------------------------------------------------------------------
var fnAddComma = function(value){
	return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
};

// --------------------------------------------------------------------------------
// fnGetLength
// --------------------------------------------------------------------------------
var fnGetLength = function(text) {
    var charLength = 0;
    var ch1 = "";
    for(var i = 0; i < text.length; i++) {
        ch1 = text.charAt(i);
        if(escape(ch1).length > 4) {		
            charLength += 2;
        } else {
            charLength += 1;
        }
    }
    return charLength;
};

// --------------------------------------------------------------------------------
// fnIsDigit
// --------------------------------------------------------------------------------
var fnIsDigit = function(str) {
	return /^\d+$/.test(str);
};

//--------------------------------------------------------------------------------
//isNumeric
//--------------------------------------------------------------------------------
var fnIsNumeric = function(str) {
	return !isNaN(Number(str + ''));
};

// --------------------------------------------------------------------------------
// fnParamsToObj
// --------------------------------------------------------------------------------
var fnHrefParamsToObject = function() {
	if ( window.location.href.indexOf('?') === -1 ) { return {}; }
	var obj = fnParamsToObj(decodeURIComponent(window.location.href.slice(window.location.href.indexOf('?') + 1)));
	for ( var key in obj ) {
        if ( obj.hasOwnProperty(key) ) {
            obj[key] = obj[key].replace('#', '');
        }
    }
	return obj;
};

// --------------------------------------------------------------------------------
// fnParamsToObj
// --------------------------------------------------------------------------------
var fnParamsToObj = function(params) {
    var obj = [], arr = params.split('&'), ele;
    for( var i = 0; i < arr.length; i++ ) {
        ele = arr[i].split(/=(.+)/);
        obj[ele[0]] = ele[1];
    }
    return obj;
};

// --------------------------------------------------------------------------------
// fnObjToParams
// --------------------------------------------------------------------------------
var fnObjToParams = function(obj) {
    var params = [];
    for ( var key in obj ) {
        if ( obj.hasOwnProperty(key) ) {
            params.push(key + '=' + obj[key]);
        }
    }
    return params.join('&');
};

// --------------------------------------------------------------------------------
// fnJsonToObj
// --------------------------------------------------------------------------------
var fnJsonToObj = function(json) { return JSON.parse(json); };

// --------------------------------------------------------------------------------
// fnObjToJson
// --------------------------------------------------------------------------------
var fnObjToJson = function(obj) { return JSON.stringify(obj); };

// --------------------------------------------------------------------------------
// fnParamsToJson
// --------------------------------------------------------------------------------
var fnParamsToJson = function(params) {
    var obj = fnParamsToObj(params);
    return fnObjToJson(obj);
};

// --------------------------------------------------------------------------------
// fnJsonToParams
// --------------------------------------------------------------------------------
var fnJsonToParams = function(json) {
    var obj = fnJsonToObj(json);
    return fnObjToParams(obj);
};

//--------------------------------------------------------------------------------
// fnReplaceHistoryState
//--------------------------------------------------------------------------------
var fnReplaceHistoryState = function(state, href) {
	var current = history.state;
	history.replaceState(fnIsEmpty(state) === false ? state : null, '', location.href);
	if ( fnIsEmpty(href) === false ) {
		var splitHref = href.split('?');
		if ( splitHref.length > 1 ) {
			href = splitHref[0] + '?';
			var arr = splitHref[1].split('&'), ele;
			for( var i = 0; i < arr.length; i++ ) {
		        ele = arr[i].split(/=(.+)/);
		        href += (i !== 0 ? '&' : '') + ele[0] + '=' + encodeURIComponent(ele[1]);
		    }
		}
		location.href = href;
	}
	return current;
};

// --------------------------------------------------------------------------------
// fnSendAjaxFile
// --------------------------------------------------------------------------------
var fnSendAjaxFile = function(url, formData, success, error, complete) {
	$.ajax({
		type : "POST",
		url : gContextPath + gVersionPath + url,
		data : formData,
		crossDomain: true,
		xhrFields: {withCredentials: true},
		headers: {'X-Requested-With':'XMLHttpRequest'},
		cache: false,
		contentType: false,
		processData: false,
		success : function(data) {
			console.log(data);
			fnRecvAjaxSuccess(success, data);
		},
		error : function(xhr, status, thrown) {
			fnRecvAjaxError(error, xhr, status, thrown, url);
		},
		complete: function(xhr, status) {
			if (typeof complete !== undefined && $.isFunction(complete)) {
				complete(xhr, status);
			}
		}
	});
};

// --------------------------------------------------------------------------------
// fnSendAjax
// --------------------------------------------------------------------------------
var fnSendAjax = function(url, params, success, error, complete) {
	console.log(url);
    console.log(params);

//    $("body").prepend('<div id="preloader"></div>');
    $.ajax({
        type: 'POST',
        url: gContextPath + gVersionPath + url,
        contentType: 'application/json',
        crossDomain: true,
        xhrFields: {withCredentials: true},
        headers: {'X-Requested-With':'XMLHttpRequest'},
        dataType: "JSON",
        data: params,
        success : function(data) {
//            $("#preloader").remove();
            console.log(data);
            fnRecvAjaxSuccess(success, data);
        },
        error : function(xhr, status, thrown) {
//            $("#preloader").remove();
            fnRecvAjaxError(error, xhr, status, thrown, url);
        },
        complete: function(xhr, status) {
//        		fnUpdateSessionTimer();
    		if (typeof complete !== undefined && $.isFunction(complete)) {
    			complete(xhr, status);
    		}
        }
    });
};

// --------------------------------------------------------------------------------
// fnRecvAjaxSuccess
// --------------------------------------------------------------------------------
var fnRecvAjaxSuccess = function(success, data) {
    if (typeof success !== undefined && $.isFunction(success)) {
        success(data);
    }
};

// --------------------------------------------------------------------------------
// fnRecvAjaxError
// --------------------------------------------------------------------------------
var fnRecvAjaxError = function(error, xhr, status, thrown, url) {
    if ( xhr.status == 401 ) {
    	window.location.href = gContextPath + "/html/login.html";
    } else {
        alert("status code: " + xhr.status + "\n" 
            + "message: " + xhr.responseText + "\n"
            + "status: " + status + "\n"
            + "thrown: " + thrown);
        if (typeof error !== undefined && $.isFunction(error)) {
            error(xhr, status, thrown);
        }
    }
};

// --------------------------------------------------------------------------------
// fnMoveToPage
// --------------------------------------------------------------------------------
//var fnMoveToPage = function(page, classes) {
//    if (typeof cbMoveToPage !== undefined && $.isFunction(cbMoveToPage)) {
//        cbMoveToPage(page, classes);
//    }
//};

//--------------------------------------------------------------------------------
//fnMoveToPage
//--------------------------------------------------------------------------------
var fnMoveToPage = function(page, classes, f) {
 if (typeof cbMoveToPage !== undefined && $.isFunction(cbMoveToPage)) {
     cbMoveToPage(page, classes, f);
 }
};

// --------------------------------------------------------------------------------
// fnPagination
// --------------------------------------------------------------------------------
var fnDisplayPagination = function(page, size, totalElements, $pagination) {
    var groupSize   = 10;

    // set default value, if page, size is negative
    page  = page * 1 > 0 ? page * 1 : 0;
    size  = size * 1 > 0 ? size * 1 : 10;
    
    // set zero, if totalElements is negative
    if ( totalElements < 0 ) {
        totalElements = 0;
    }
    
    // calculate a number of total pages
    //var totalPages = (totalElements / size) + (totalElements % size == 0 ? 0 : 1);
    var totalPages = Math.ceil(totalElements / size);
    var lastPage = totalPages - 1 > 1 ? totalPages  - 1 : 0;
    
    // adjust page, if page great than totalPagess
    page = page >= totalPages ? (totalPages > 0 ? totalPages - 1 : 0) : page;

    // previous and next page number
    var prevPage = Math.floor(page / groupSize) * groupSize - 1;
    var nextPage = prevPage + groupSize + 1;
    
    // start and end page number
    var startPage =  prevPage + 1;
    var endPage = nextPage - 1;
    
    // adjust the end page number, if it's wrong
    if( endPage >= totalPages ){
        endPage = totalPages - 1;
    }

    // current page group number
	var currPageGroup = Math.ceil((page + 1) / groupSize);
    
    // a number of total page group
    var totalPageGroup = Math.ceil(totalPages / groupSize);

    if ( fnIsEmpty($pagination) ) {
    	$pagination = $('.pagination');
    }
    var classArr = $pagination.attr("class").split(' ');
    if ( classArr.indexOf('pagination') === -1 ) {
        classArr.push('pagination');
    }
    var classes = classArr.join(' ');
    var html =  '<div class="' + classes + '">';
        html +=     '<ul>';
        html +=         '<li class="p_img page-first"><a href="javascript:void(0);"';
    if ( page >= 1 ) {
        html +=         ' onclick="javascript:fnMoveToPage(0, \'' + classes + '\'); return false;"';
    }
        html +=         '></a></li>';
        html +=         '<li class="p_img page-prev"><a href="javascript:void(0);"';
    if ( prevPage + 1 >= groupSize ) { 
        html +=             ' onclick="javascript:fnMoveToPage(' + prevPage + ', \'' + classes + '\'); return false;"';
    }
        html +=         '></a></li>';
    for ( var i = startPage; i <= endPage; i++ ) {
        html +=         '<li class="' + (i == page ? 'on' : '') + '" data-page="' + i + '">';
        html +=             '<a href="javascript:void(0);" onclick="javascript:fnMoveToPage(' + i + ', \'' + classes + '\'); return false;">' + (i + 1) + '</a>';
        html +=         '</li>';
    }
    html +=             '<li class="p_img page-next"><a href="javascript:void(0);"';
    if ( currPageGroup < totalPageGroup ) {
        html +=             ' onclick="javascript:fnMoveToPage(' + nextPage + ', \'' + classes + '\'); return false;"';
    }
        html +=         '></a></li>';
        html +=         '<li class="p_img page-last"><a href="javascript:void(0);"';
    if ( page < endPage ) {
        html +=             ' onclick="javascript:fnMoveToPage(' + endPage + ', \'' + classes + '\'); return false;"';
    }
        html +=         '></a></li>';
        html +=     '</ul>';
        html += '</div>';
    if ( $pagination.hasClass('pagination') == false ) {
        $('.content_wrap').append(html);
    } else {
        $pagination.replaceWith(html);
    }

    $('.pagination ul li a:not([onclick])').closest('li').css('opacity', 0.2);
};


//--------------------------------------------------------------------------------
//fnDisplayPaginationByFunction
//--------------------------------------------------------------------------------
var fnDisplayPaginationByFunction = function(page, size, totalElements, $pagination, f) {
	var groupSize   = 10;

	// set default value, if page, size is negative
	page  = page * 1 > 0 ? page * 1 : 0;
	size  = size * 1 > 0 ? size * 1 : 10;

	// set zero, if totalElements is negative
	if ( totalElements < 0 ) {
		totalElements = 0;
	}

	// calculate a number of total pages
	// var totalPages = (totalElements / size) + (totalElements % size == 0 ? 0 : 1);
	var totalPages = Math.ceil(totalElements / size);
	var lastPage = totalPages - 1 > 1 ? totalPages  - 1 : 0;

	// adjust page, if page great than totalPagess
	page = page >= totalPages ? (totalPages > 0 ? totalPages - 1 : 0) : page;

	// previous and next page number
	var prevPage = Math.floor(page / groupSize) * groupSize - 1;
	var nextPage = prevPage + groupSize + 1;

	// start and end page number
	var startPage =  prevPage + 1;
	var endPage = nextPage - 1;

	// adjust the end page number, if it's wrong
	if( endPage >= totalPages ){
		endPage = totalPages - 1;
	}

	// current page group number
	var currPageGroup = Math.ceil((page + 1) / groupSize);

	// a number of total page group
	var totalPageGroup = Math.ceil(totalPages / groupSize);

	if ( fnIsEmpty($pagination) ) {
		$pagination = $('.pagination');
	}
	var classArr = $pagination.attr("class").split(' ');
	if ( classArr.indexOf('pagination') === -1 ) {
		classArr.push('pagination');
	}
	var classes = classArr.join(' ');
	var html =  '<div class="' + classes + '">';
    	html +=     '<ul>';
    	html +=         '<li class="p_img page-first"><a href="javascript:void(0);"';
    if ( page >= 1 ) {
    	html +=         ' onclick="javascript:fnMoveToPage(0, \'' + classes + '\', \'' + f + '\'); return false;"';
    }
    html +=         '></a></li>';
    html +=         '<li class="p_img page-prev"><a href="javascript:void(0);"';
    if ( prevPage + 1 >= groupSize ) { 
    	html +=             ' onclick="javascript:fnMoveToPage(' + prevPage + ', \'' + classes + '\', \'' + f + '\'); return false;"';
    }
    html +=         '></a></li>';
    for ( var i = startPage; i <= endPage; i++ ) {
    	html +=         '<li class="' + (i == page ? 'on' : '') + '" data-page="' + i + '">';
    	html +=             '<a href="javascript:void(0);" onclick="javascript:fnMoveToPage(' + i + ', \'' + classes + '\', \'' + f + '\'); return false;">' + (i + 1) + '</a>';
    	html +=         '</li>';
    }
    html +=             '<li class="p_img page-next"><a href="javascript:void(0);"';
    if ( currPageGroup < totalPageGroup ) {
    	html +=             ' onclick="javascript:fnMoveToPage(' + nextPage + ', \'' + classes + '\', \'' + f + '\'); return false;"';
    }
    html +=         '></a></li>';
    html +=         '<li class="p_img page-last"><a href="javascript:void(0);"';
    if ( page < endPage ) {
    	html +=             ' onclick="javascript:fnMoveToPage(' + lastPage + ', \'' + classes + '\', \'' + f + '\'); return false;"';
    }
    html +=         '></a></li>';
    html +=     '</ul>';
    html += '</div>';

    if ( $pagination.hasClass('pagination') == false ) {
    	$('.content_wrap').append(html);
    } else {
    	$pagination.replaceWith(html);
    }
};

//--------------------------------------------------------------------------------
//fnClassInToDisplayPagination
//--------------------------------------------------------------------------------
var fnClassInToDisplayPagination = function(page, size, totalElements, $pagination, $paginationClassName, f) {
	var groupSize   = 10;

	// set default value, if page, size is negative
	page  = page * 1 > 0 ? page * 1 : 0;
	size  = size * 1 > 0 ? size * 1 : 10;

	// set zero, if totalElements is negative
	if ( totalElements < 0 ) {
		totalElements = 0;
	}

	// calculate a number of total pages
	// var totalPages = (totalElements / size) + (totalElements % size == 0 ? 0 : 1);
	var totalPages = Math.ceil(totalElements / size);
	var lastPage = totalPages - 1 > 1 ? totalPages  - 1 : 0;

	// adjust page, if page great than totalPagess
	page = page >= totalPages ? (totalPages > 0 ? totalPages - 1 : 0) : page;

	// previous and next page number
	var prevPage = Math.floor(page / groupSize) * groupSize - 1;
	var nextPage = prevPage + groupSize + 1;

	// start and end page number
	var startPage =  prevPage + 1;
	var endPage = nextPage - 1;

	// adjust the end page number, if it's wrong
	if( endPage >= totalPages ){
		endPage = totalPages - 1;
	}

	// current page group number
	var currPageGroup = Math.ceil((page + 1) / groupSize);

	// a number of total page group
	var totalPageGroup = Math.ceil(totalPages / groupSize);

	if ( fnIsEmpty($pagination) ) {
		$pagination = $('.pagination');
	}
	var classArr = $pagination.attr("class").split(' ');
	if ( classArr.indexOf('pagination') === -1 ) {
		classArr.push('pagination');
	}
	var classes = classArr.join(' ');
	var html =  '<div class="' + classes + '">';
		html +=     '<ul>';
		html +=         '<li class="p_img page-first"><a href="javascript:void(0);"';
    if ( page >= 1 ) {
    	html +=         ' onclick="javascript:fnMoveToPage(0, \'' + classes + '\', \'' + f + '\'); return false;"';
    }
    html +=         '></a></li>';
    html +=         '<li class="p_img page-prev"><a href="javascript:void(0);"';
    if ( prevPage + 1 >= groupSize ) { 
    	html +=             ' onclick="javascript:fnMoveToPage(' + prevPage + ', \'' + classes + '\', \'' + f + '\'); return false;"';
    }
    html +=         '></a></li>';
    for ( var i = startPage; i <= endPage; i++ ) {
    	html +=         '<li class="' + (i == page ? 'on' : '') + '" data-page="' + i + '">';
    	html +=             '<a href="javascript:void(0);" onclick="javascript:fnMoveToPage(' + i + ', \'' + classes + '\', \'' + f + '\'); return false;">' + (i + 1) + '</a>';
    	html +=         '</li>';
    }
    html +=             '<li class="p_img page-next"><a href="javascript:void(0);"';
    if ( currPageGroup < totalPageGroup ) {
    	html +=             ' onclick="javascript:fnMoveToPage(' + nextPage + ', \'' + classes + '\', \'' + f + '\'); return false;"';
    }
    html +=         '></a></li>';
    html +=         '<li class="p_img page-last"><a href="javascript:void(0);"';
    if ( page < endPage ) {
    	html +=             ' onclick="javascript:fnMoveToPage(' + lastPage + ', \'' + classes + '\', \'' + f + '\'); return false;"';
    }
  	html +=         '></a></li>';
  	html +=     '</ul>';
  	html += '</div>';

  	$paginationClassName.html(html);
};


//--------------------------------------------------------------------------------
//fnRegFocus
//--------------------------------------------------------------------------------
var fnRegFocus = function(added, $tr) {
	if ( added === true ) {
		if ( fnIsEmpty($tr) || $tr.length === 0 ) {
			$('.fixed_table_container table tbody').find('tr input:first').focus();
		} else {
			$tr.next().find('input:first').focus();
		}
	} else {
		if ( $tr.next().length !== 0 ) {
			$tr.next().find('input:first').focus();
		} else {
			$tr.prev().find('input:first').focus();
		}
	}
};

// --------------------------------------------------------------------------------
// removeSpecialCharacters (IE8)
// --------------------------------------------------------------------------------
var fnRemoveSpecialCharacters = function(word, charArr, altArr) {
	if ( fnIsEmpty(word) ) { return ''; }
	var specialChars = fnIsEmpty(charArr) ? '!@#$^&%*()+=-[]\/{}|:<>?,.' : charArr.join(''), tmp = word;
	for ( var i = 0; i < specialChars.length; i++ ) {
		var alt = fnIsEmpty(charArr) === false && fnIsEmpty(altArr) === false && charArr.length === altArr.length ? altArr[i] : '';
		tmp = tmp.replace(new RegExp('\\' + specialChars[i], 'gi'), alt);
	}
	return tmp;
}

// --------------------------------------------------------------------------------
// paintBackgroundYellow
// --------------------------------------------------------------------------------
var fnPaintBackgroundYellow = function(word, pttn, type) {
	if ( fnIsEmpty(word) ) { return ''; }
	if ( fnIsEmpty(pttn) ) { return word; }
	if ( type === false ) { return word; }
	var regex = new RegExp(pttn, 'gim');
	return word.replace(regex, '<span style="background-color:yellow;">' + pttn + '</span>');
};

var CONTENT_TYPE = 'application/json;charset=UTF-8';
var API_HEADERS = {};

$.fn.Ajax = function (type, url, jsonData, callback, errorCallback) {

    if (type=="GET") {
        if(!$.isEmptyObject(jsonData)){
            jsonData = jQuery.param(jsonData)
        }
    }else{
        jsonData  = JSON.stringify(jsonData);
    };

    var $xhr = jQuery.ajax({
        type: type == undefined ? "GET" : type,
        url: gContextPath + gVersionPath + url,
        headers: API_HEADERS,
        contentType: CONTENT_TYPE,
        data: jsonData,
        dataType: 'json',
        success: function (response) {
            console.log(url);
            console.log(response);
            if($.fn.errorMsg(response)) return;
            callback && callback(response);
        },
        error: function (req, status, error) {
            console.log('Ajax ERROR > : ',type, url, jsonData);

           /* console.log(url);*/
            console.log(req);

            if(req.status === 401){
                location.href="login.html";
                return false;
            }

            if(typeof errorCallback === "function") {
                errorCallback(req, status, error);
            }
        }
    });
    return $xhr;
};

$.fn.errorMsg = function(response) {
    var flag = false;
    if( response.resultCode !== undefined && response.resultCode == "NG"){
        if($(".pop_common_alert").length == 0){
            alert(response.resultMsg);
            flag = true;
        }else{
            commonMsg.alert(response.resultMsg);
            flag = true;
        }
    };
    return flag;
};

var isEmpty = function(value) {
    return typeof value == 'string' && !value.trim() || typeof value == 'undefined' || value === null;
}

var grid = {

    dataAdd: function(option, callback, totalCnt) {

        var style = option.style;
        var _this = option.table;
        var data = option.data;
        var tbody = '';

        _this.find('tbody').remove();
        $(_this).append('<tbody></tbody>');

        if (style == 'check-table') {
            tbody = grid.cbody(data, option, totalCnt);
        } else {
            tbody = grid.body(data, option, totalCnt);
        }

        $(_this).find('tbody').append(tbody);

        if (callback) {
            callback(data);
        }

        switch (style) {
            case 'data-table':
                $(_this).dataTable().fnDestroy();
                tableOption = {
                    "sDom": "t<'row'<'center'><p>>",
                    "order": [
                        [0, "desc"]
                    ],
                };
                $(_this).dataTable(tableOption);
                break;
            case 'check-table':
                grid.page(option, data, callback, type);
                break;
            case 'page-table':
                grid.page(option, data, callback, type);
                break;
            case 'script-page-table':
                //id, 현재 페이지, 페이지 사이즈, 전체 갯수
                grid.scriptPage(_this.attr("id"), 1, option.pageSize, totalCnt);
                break;
            default: //'table'
                break;
        }

        //값이 없을 때
        if(isEmpty(tbody)){
            var theadLength = $(_this).find('thead > tr > th').length;
            $(_this).find('tbody').append("<tr empty='Y'><td colspan='" + theadLength + " '>데이터가 없습니다.</td></tr>");
        }
    },

    add: function(option, callback, type) {

        var style = option.style;
        var _this = option.table;
        var _pageSize = option.pageSize;
        var tbody = '';

        _this.find('tbody').remove();
        $(_this).append('<tbody></tbody>');
        if (option.parameters !== undefined) {
            if ($.isEmptyObject(option.param)) {
                option.param = option.parameters;
            } else {
                option.param = $.extend({}, option.param, option.parameters);
            }
        }

        if(type == undefined) type = "GET";
        $.fn.Ajax(type, option.url, option.param, function(result) {
            data = result.data.resultData;
            //console.log(data);
            //토탈 카운트
            var totalCnt = result.data.totalCnt;
            if (style == 'check-table') {
                tbody = grid.cbody(data, option, totalCnt);
            } else {
                tbody = grid.body(data, option, totalCnt);
            }
            /*if (callback) {
              callback(result);
            }*/
        }).done(function(data) {
            $(_this).find('tbody').append(tbody);

            switch (style) {
                case 'data-table':
                    $(_this).dataTable().fnDestroy();
                    tableOption = {
                        "sDom": "t<'row'<'center'><p>>",
                        "order": [
                            [0, "desc"]
                        ],
                    };
                    $(_this).dataTable(tableOption);
                    break;
                case 'check-table':
                    /*$(_this).dataTable().fnDestroy();
                    tableOption = {
                      "sDom": "t<'row'<'center'><p>>",
                      "order": [
                        [0, "desc"]
                      ],
                    };
                    $(_this).dataTable(tableOption);*/
                    grid.page(option, data, callback, type);
                    break;
                case 'page-table':
                    grid.page(option, data, callback, type);
                    break;
                case 'script-page-table':
                    //id, 현재 페이지, 페이지 사이즈, 전체 갯수
                    var _totalCnt = isEmpty(data.data.resultData) ? 0 : data.data.resultData.length;
                    grid.scriptPage(_this.attr("id"), 1, _pageSize, _totalCnt);
                    break;
                default: //'table'

                    break;
            }


            //값이 없을 때
            if(isEmpty(tbody)){
                var theadLength = $(_this).find('thead > tr > th').length;
                $(_this).find('tbody').append("<tr empty='Y'><td colspan='" + theadLength + " '>데이터가 없습니다.</td></tr>");
            }

            if (callback) {
                callback(data);
            }

        });
    },
    page: function(option, data, callback, type) {
        option.table.closest('.table_wrap').next('.pagination').remove();

        if(isEmpty(data.data) || isEmpty(data.data.totalCnt) || data.data.totalCnt == 0){
            return;
        }

        var _pageNumberUnit = 10;
        var _pageUnit = option.param.pageSize;
        if (_pageUnit == undefined) {
            _pageUnit = 10;
        }
        var _totCnt = data.data.totalCnt;
        var _currentPage = option.param.page;
        if (_currentPage == undefined) {
            _currentPage = 1;
        }
        var _totPage = _totCnt % _pageUnit == 0 ? Math.floor(_totCnt / _pageUnit) : Math.floor(_totCnt / _pageUnit) + 1;
        //var _startPage = 1;
        var _startPage = _currentPage % _pageNumberUnit == 0 ? Math.floor((Number(_currentPage)-1) / _pageNumberUnit) * _pageNumberUnit +1 : Math.floor(_currentPage / _pageNumberUnit) * _pageNumberUnit + 1;
        var _endPage = Number(_startPage) + Number(_pageNumberUnit) -1;

        if (_endPage > _totPage) {
            _endPage = _totPage;
        }
        var _prevPage = _currentPage > 1 ? Number(_currentPage) - 1 : _currentPage;
        var _nextPage = _currentPage < _totPage ? Number(_currentPage) + 1 : _currentPage;
        //console.log("_totCnt:", _totCnt, "_currentPage:", _currentPage, "_pageUnit:", _pageUnit, "_totPage:", _totPage, "_endPage:", _endPage);

        var _page = '';
        var paginId =  option.table.attr("id") + "_paginId";
        _page += '<div class="pagination" id="' + paginId + '">                                 ';
        _page += '<ul class="clearfix">                                    ';
        _page += '<li class="p_img page-first"><a href="javascript:void(0)">1</a></li>     ';
        _page += '<li class="p_img page-prev"><a href="javascript:void(0)">' + _prevPage + '</a></li>      ';
        for (var i = _startPage; i <= _endPage; i++) {
            if (i == _currentPage) {
                _page += '<li class="on"><a href="javascript:void(0)">' + i + '</a></li>                      ';
            } else {
                _page += "<li class=''><a href='javascript:void(0)'>" + i + "</a></li>                      ";
            }
        }
        _page += '<li class="p_img page-next"><a href="javascript:void(0)">' + _nextPage + '</a></li>      ';
        _page += '<li class="p_img page-last"><a href="javascript:void(0)">' + _totPage + '</a></li>     ';
        _page += '</ul>                                                    ';
        _page += '</div>                                                   ';

        option.table.closest('.table_wrap').after(_page);

        $('#'+ paginId + ' > ul > li').on("click", function() {
            var _currentPage = $(this).closest(".pagination").find(".on").text();
            var _page = $(this).text();
            if(_currentPage != _page){
                option.param.page = _page;
                option.param.pageSize = _pageUnit;
                grid.add(option, callback, type);

                console.log('_page:', _page, 'param:', option, 'callback:', callback)
            }
        })
    },
    scriptPage: function(tableId, page, pageSize, totalCnt) {

        $("#" + tableId).closest('.table_wrap').next('.pagination').remove();

        if(isEmpty(totalCnt) || totalCnt == 0){
            return;
        }

        var _pageNumberUnit = 10;
        var _pageUnit = pageSize;
        if (_pageUnit == undefined) {
            _pageUnit = 10;
        }
        var _totCnt = totalCnt;
        var _currentPage = page;
        if (_currentPage == undefined) {
            _currentPage = 1;
        }
        var _totPage = _totCnt % _pageUnit == 0 ? Math.floor(_totCnt / _pageUnit) : Math.floor(_totCnt / _pageUnit) + 1;
        //var _startPage = 1;
        var _startPage = _currentPage % _pageNumberUnit == 0 ? Math.floor((Number(_currentPage)-1) / _pageNumberUnit) * _pageNumberUnit +1 : Math.floor(_currentPage / _pageNumberUnit) * _pageNumberUnit + 1;
        var _endPage = Number(_startPage) + Number(_pageNumberUnit) -1;

        if (_endPage > _totPage) {
            _endPage = _totPage;
        }
        var _prevPage = _currentPage > 1 ? Number(_currentPage) - 1 : _currentPage;
        var _nextPage = _currentPage < _totPage ? Number(_currentPage) + 1 : _currentPage;
        //console.log("_totCnt:", _totCnt, "_currentPage:", _currentPage, "_pageUnit:", _pageUnit, "_totPage:", _totPage, "_endPage:", _endPage);

        var _page = '';
        var paginId =  tableId + "_paginId";
        _page += '<div class="pagination" id="' + paginId + '">                                 ';
        _page += '<ul class="clearfix">                                    ';
        _page += '<li class="p_img page-first"><a href="javascript:void(0)">1</a></li>     ';
        _page += '<li class="p_img page-prev"><a href="javascript:void(0)">' + _prevPage + '</a></li>      ';
        for (var i = _startPage; i <= _endPage; i++) {
            if (i == _currentPage) {
                _page += '<li class="on"><a href="javascript:void(0)">' + i + '</a></li>                      ';
            } else {
                _page += "<li class=''><a href='javascript:void(0)'>" + i + "</a></li>                      ";
            }
        }
        _page += '<li class="p_img page-next"><a href="javascript:void(0)">' + _nextPage + '</a></li>      ';
        _page += '<li class="p_img page-last"><a href="javascript:void(0)">' + _totPage + '</a></li>     ';
        _page += '</ul>                                                    ';
        _page += '</div>                                                   ';

        $("#" + tableId).closest('.table_wrap').after(_page);
        $("#" + tableId).find("tbody > tr").hide();

        var startIndex = ( Number(_currentPage) * Number(_pageUnit) ) - Number(_pageUnit);
        var endIndex = ( Number(_currentPage) * Number(_pageUnit) );

        for (var i = startIndex; i < endIndex; i++) {
            $("#" + tableId).find("tbody > tr").eq(i).show();
        }


        $('#'+ paginId + ' > ul > li').on("click", function() {
            var _currentPage = $(this).closest(".pagination").find(".on").text();
            var _page = $(this).text();
            if(_currentPage != _page){
                grid.scriptPage(tableId, _page, _pageUnit, _totCnt);
            }
        })
    },




    reload: function(option, callback) {
        var style = option.style;
        var _this = option.table;
        var tbody = '';
        _this.find('tbody > tr').remove();

        if (option.parameters !== undefined) {
            if ($.isEmptyObject(option.param)) {
                option.param = option.parameters;
            } else {
                option.param = $.extend({}, option.param, option.parameters);
            }
        }

        $.fn.Ajax("GET",option.url, option.param, function(data) {
            if (style == 'check-option') {
                tbody = grid.cbody(data, option);
            } else {
                tbody = grid.body(data, option);
            }
            if (callback) {
                callback(data);
            }
        }).done(function() {
            $(_this).find('tbody').append(tbody);
        });
    },

    row: function(option, callback) {
        //console.log('row click',option)
        option.table.on('click', 'tr', function() {
            var _keyIndex = grid.key(option);
            var rowData = grid.select(this);
            callback(rowData)
        });
    },

    delete: function(option, callback) {
        console.log('option delete > callback:', callback);
        if (option.style == 'check-option') { // delete checked row
            $(option.table).find('tr').each(function(i, row) {
                var checked = $(this).find('input[type="checkbox"]').eq(0).is(":checked") ? true : false;
                //console.log('checked:',checked);
                var tds = $(this).closest('tr').find('td');
                var rowData = []
                tds.each(function(i, td) {
                    rowData.push($(td).text())
                })
                var _keyIndex = grid.key(option);

                //console.log('i','checked',checked,'_keyIndex:',_keyIndex,rowData[_keyIndex]);
                if (checked && rowData[_keyIndex] !== undefined) {
                    fnJsonAction("DELETE", option.url + rowData[_keyIndex], callback);
                    $(this).remove();
                }
            });
        }
    },

    headerJson: function(option) {
        var thJson = [];
        var _table = option.table;
        _table.find('thead').find('th').each(function() {
            // table header 값을 data로 변경함
            if ($(_table).find('data')) {
                th = $(this).attr('data');
            } else {
                th = $(this).text().trim();
            }

            /*
            // id사용 > data 사용으로 변경
            if ($(this).attr('id')) {
              th = $(this).attr('id');
            } else {
              th = $(this).text().trim();
            }*/

            //if (th != '') {
            if (!isEmpty(th)){
                thJson.push(th);
            }
        });

        return thJson;
    },

    headerArray: function(option) {
        var thArr = [];
        var _table = option.table;
        _table.find('thead').find('th').each(function() {
            if ($(this).attr('id')) {
                th = $(this).attr('id');
            } else {
                th = $(this).text().trim();
            }
            if (th != '') {
                thArr.push(th);
            }
        })
        return thArr;
    },

    body: function(data, option, totalCnt) {
        var tbody = '';
        var thJson = grid.headerJson(option);

        var seqNumber = 1;
        $.each(data, function(i, el) {
            tbody = tbody + '<tr';
            if(option.setRespParmTr != undefined){
                $.each(option.setRespParmTr, function(i, name) {
                    if(el[name] != undefined) tbody = tbody + ' ' + name + '=\"' + el[name] + '\" ';
                });
            }
            tbody = tbody + '>';


            $.each(thJson, function(value, th) {

                var eachFlag = true;

                for (key in el) {
                    if (key == th) {
                        var visible = ( option.table.find('[data="'+th+'"]').css("display") == "none" ) ? false : true;
                        var style = '';
                        if(!visible){
                            style='style=\'display:none\'';
                        }
                        tbody = tbody + "<td "+style+"data="+key+">" + grid.cdata(key, el[key], option, el) + "</td>";
                        //tbody = tbody + "<td>" + el[key] + "</td>";
                    }else{

                        //순번이 필요할때 리턴값에는 없지만 필요할때
                        //th id를 _GRID_CUSTORM_ 으로 포함되도록 만든다.
                        if(eachFlag && th.indexOf("GRID_CUSTORM_") != -1){

                            var gridData = "";
                            // 순번 역순
                            if(th.indexOf("GRID_CUSTORM_SEQ_DESC") != -1){

                                if(isEmpty(option.param) || isEmpty(option.param.page))  {
                                    if(isEmpty(totalCnt)){
                                        totalCnt = data.length;
                                    }
                                    gridData = totalCnt;
                                    totalCnt--;

                                }else{
                                    gridData = Number(totalCnt) - ( (Number(option.param.page) -1) * Number(option.param.pageSize) + seqNumber-1);
                                }
                                seqNumber++

                            }else if(th.indexOf("GRID_CUSTORM_SEQ") != -1){

                                if(isEmpty(option.param) || isEmpty(option.param.page))  {
                                    gridData = seqNumber;
                                }else{
                                    gridData = (Number(option.param.page) -1) * Number(option.param.pageSize) + seqNumber;
                                }
                                seqNumber++;
                            }

                            tbody = tbody + "<td>" + grid.cdata(th, gridData, option, el) + "</td>";
                            eachFlag= false;
                        }
                    }
                }
            });
            tbody = tbody + '</tr>';
        });
        return tbody;
    },

    cbody: function(data, option, totalCnt) {
        var tbody = '';
        var _key = option.key;
        var thJson = grid.headerJson(option);
        var seqNumber = 1;

        $.each(data, function(i, el) {
            tbody = tbody + '<tr><td class="center"><input type="checkbox" class="checkMe" id="' + option.table.attr("id") + i + '" ><label for="' + option.table.attr("id") + i + '"></label></td>';
            $.each(thJson, function(value, th) {
                var eachFlag = true;

                for (key in el) {
                    if (key == th) {
                        var visible = ( option.table.find('[data="'+th+'"]').css("display") == "none" ) ? false : true;
                        var style = '';
                        if(!visible){
                            style='style=\'display:none\'';
                        }
                        tbody = tbody + "<td "+style+"data="+key+">" + grid.cdata(key, el[key], option, el) + "</td>";
                    }else{

                        //순번이 필요할때 리턴값에는 없지만 필요할때
                        //th id를 _GRID_CUSTORM_ 으로 포함되도록 만든다.
                        if(eachFlag && th.indexOf("GRID_CUSTORM_") != -1){

                            var gridData = "";
                            // 순번 역순
                            if(th.indexOf("GRID_CUSTORM_SEQ_DESC") != -1){

                                if(isEmpty(option.param) || isEmpty(option.param.page))  {
                                    if(isEmpty(totalCnt)){
                                        totalCnt = data.length;
                                    }
                                    gridData = totalCnt;
                                    totalCnt--;

                                }else{
                                    gridData = Number(totalCnt) - ( (Number(option.param.page) -1) * Number(option.param.pageSize) + seqNumber-1);
                                }
                                seqNumber++

                            }else if(th.indexOf("GRID_CUSTORM_SEQ") != -1){

                                if(isEmpty(option.param) || isEmpty(option.param.page))  {
                                    gridData = seqNumber;
                                }else{
                                    gridData = (Number(option.param.page) -1) * Number(option.param.pageSize) + seqNumber;
                                }
                                seqNumber++;
                            }

                            tbody = tbody + "<td>" + grid.cdata(th, gridData, option, el) + "</td>";
                            eachFlag= false;
                        }
                    }
                }
            });
            tbody = tbody + '</tr>';
        });
        return tbody;
    },

    select: function(obj) {
        var $row = $(obj).closest("tr");
        var rowData = [];
        $tds = $row.find("td");
        $.each($tds, function() {
            _col = $(this).text();
            if ($(this).find('input').length) {
                _col = $(this).find('input').is(':checked');
            }
            rowData.push(_col);
        });
        return rowData;
    },

    selectData: function(obj) {
        var $row = $(obj).closest("tr");
        var rowData = {};
        var $th = $(obj).closest("table").find("thead > tr:eq(0) > th");

        $tds = $row.find("td");
        $.each($tds, function(index, data) {
            _col = $(this).text();
            if ($(this).find('input').length) {
                _col = $(this).find('input').is(':checked');
            }
            var _key = $th.eq(index).attr("data");
            rowData[_key] = _col;
        });
        return rowData;
    },

    key: function(_option) {
        var index = 0;
        var keyIndex = 0;
        var ths = grid.headerJson(_option);
        var _key = _option.key;
        $.each(ths, function(th, el) {
            if (_key == th && _key != "") {
                keyIndex = index;
            }
            index++;
        });
        //console.log('keyIdx keyIndex:',keyIndex);
        return keyIndex;
    },

    pop: function(option, callback) {
        var _src = option.popUrl;
        if (option.style == 'check-option') { // delete checked row

            var _keyIndex = grid.key(option);
            var checkRows = checkedrawToArray(option);
            //console.log('checkedrawToArray:',checkRows);
            $.map(checkRows, function(_rows, i) {
                $.map(_rows, function(row, i) {
                    //console.log('row:', row);
                    _src += '?' + option.key + '=' + row[_keyIndex];
                    //var callback = $(this).attr('data-callback');
                    $("#frameModal iframe").attr({
                        'src': _src,
                        'data-callback': callback,
                        'allowfullscreen': '',
                    });
                    $('#frameModal').modal({
                        show: true
                    })
                })
            });

        } else {
            var keyVal = $("input[name=" + option.key + "]").val();
            option.form.fnFormAction("DELETE", option.url + keyVal, callback);
        }
    },

    cdata: function(key, data, option, el) {
        var retVal = data;
        retVal = convChar(retVal);
        if ($.isFunction(option.callback)) {
            retVal = option.callback(key, retVal, el);
        }
        if (data != '' && data != null && data.length > 300) {
            retVal = data.substring(0, 300) + '...';
        }
        if (isEmpty(retVal)) {
            retVal = '';
        }
        return retVal;
    }

};

function convChar(str) {
    if ($.type(str) === "string") {
        str = str.replace(/&/g, "&amp;");
        str = str.replace(/>/g, "&gt;");
        str = str.replace(/</g, "&lt;");
        str = str.replace(/"/g, "&quot;");
        str = str.replace(/'/g, "&#039;");

        str = str.replace(/[\"\'][\s]*javascript:(.*)[\"\']/g, "\"\"");
        str = str.replace(/eval\((.*)\)/g, "");
    }
    return str;
};

function getLoginName()
{
    var url = '/common/lgoinUser';
    var params = '{}';
    fnSendAjax(url, params,
        function(data) {
            if ( data.resultCode == 'E0000' ) {

                var info = data.result.info;

               $("#userLoginName").text(info.username);
               $("#userLoginName").data("user", data.result.info);

            } else {
                if ( data.resultCode != 'E0002' ) {
                    alert(data.resultMsg);
                }
            }
        },
        function(xhr, status, thrown) {
            alert("조회에 실패했습니다.");
        }
    );
}