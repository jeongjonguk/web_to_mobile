$(function() {
    // http://japanese.visitkorea.or.kr/jpn/ATR/SI_JPN_8_1.jsp?cid=2695855
    // http://japanese.visitkorea.or.kr/jpn/TMC/TE_JA_7_6.jsp?cid=2698002

    Spinner();
    Spinner.hide();

    $('#visit-web-site-menu-select').on('click', function() {
        if ( $(this).val() === 'inssa_korea' ) {
            $('#visit-web-site-category-select').css({width: '39%', float: 'right', display: 'block'});
            $('#visit-web-site-menu-select').css({width: '59%', float: 'left'});
        } else {
            $('#visit-web-site-category-select').css({width: '0%', float: 'right', display: 'none'});
            $('#visit-web-site-menu-select').css({width: '100%', float: 'left'});
        }
    });

    // -----------------------------------------------------------------------------------
    // 복사하기 버튼 클릭(iframe으로 사이트 오픈) 
    // -----------------------------------------------------------------------------------
    $('#visit-web-site-copy-button').on('click', function() {
        var url = $('#visit-web-site-url-input').val();
        if ( fnIsEmpty(url) === true ) {
            alert('방문할 웹 사이트 주소를 입력하세요.');
            return false;
        }
        $('#visit-web-site-iframe').attr('src', url);
        $('#visit-web-site-iframe').addClass('on');
        Spinner.show();
    });

    // -----------------------------------------------------------------------------------
    // iframe의 사이트 오픈이 완료되었을 때  
    // -----------------------------------------------------------------------------------
    $('#visit-web-site-iframe').on('load', function() {
        // prevent to copy when refreshed 
        if ( $(this).hasClass('on') === false ) { return false; }
        $('#visit-web-site-iframe').removeClass('on');

        // perform job by menu
        var doc = document.getElementById("visit-web-site-iframe").contentWindow.document
            , menu = $('#visit-web-site-menu-select').val()
            , category = $('#visit-web-site-category-select').val()
            , result = { content: undefined, title : '' };
        switch ( menu ) {
            case 'inssa_korea':
                switch ( category ) {
                    case 'food': 
                        result = inssa_korea_food.perform(doc);
                        break;
                    case 'activity':
                        result = inssa_korea_activity.perform(doc);
                        break;
                    case 'shopping':
                        result = inssa_korea_shopping.perform(doc);
                        break;
                    default:
                        console.error('unknown category');
                        break;
                }
                break;
            case 'travel_highlights':
                result = travel_highlights.perform(doc);
                break;
            case 'im_vk_writer':
                result = im_vk_writer.perform(doc);
                break;
            default:
                console.error('unknown menu');
                break;
        }

        // open new window
        fnOpenWindow(result);
        Spinner.hide();
    });
});

// -----------------------------------------------------------------------------------
// 새창    
// -----------------------------------------------------------------------------------
var fnOpenWindow = function(result) {
    if ( fnIsEmpty(result) || fnIsEmpty(result.content) ) {
        alert('Not found element!')
        return false;
    }

    var w = window.open()
        , $head = $(w.document.head)
        , $body = $(w.document.body)
        , html = ''
        , copy = '';

    copy += 'var copyToClipboard = function () {';
    copy += 'var str = document.getElementById(\'copy-target-content\').innerHTML;';
    copy += 'function listener(e) {';
    copy += 'e.clipboardData.setData(\'text/html\', str);';
    copy += 'e.clipboardData.setData(\'text/plain\', str);';
    copy += 'e.preventDefault();';
    copy += '}';
    copy += 'document.addEventListener(\'copy\', listener);';
    copy += 'document.execCommand(\'copy\');';
    copy += 'document.removeEventListener(\'copy\', listener);';
    copy += 'alert(\'클립보드에 복사되었습니다\');'
    copy += '};';
    copy += 'copyToClipboard();';

    html += '<button onclick="' + copy + '" style="';
    html += 'position: fixed;right: 2%;top: 20px; z-index: 999;inline-block;height:32px;line-height:30px;outline:none;';
    html += 'font-family:\'NotoKrM\';color:#0c346a;border-radius:15px;padding:0 12px;background-color:#ffd907;';
    html += '">복사하기</button>';
    html += '<div id="wrapper">';
    html +=     '<div class="gnb03">';
    html +=         '<div class="row">';
    html +=             '<span class="category">' + result.topic + '</span>';
    html +=         '</div>';
    html +=         '<h2>' + (fnIsEmpty(result.title) ? '타이틀을 찾지 못했습니다' : result.title) + '</h2>';
    html +=     '</div>';
    html +=     '<div>';
    html +=         '<div class="content">';
    html +=             '<div class="view_img">';
    html +=                 '<div class="pictext2"></div>';
    html +=             '</div>';
    html +=             '<div class="textArea">';
    html +=                 '<div class="txt" id="copy-target-content">';
    html +=                     result.content;
    html +=                 '</div>';
    html +=             '</div>';
    html +=         '</div>';
    html +=     '</div>';
    html +=     '<form id="frmError" onsubmit="return false;">';
    html +=         '<div class="report_wrap">';
    html +=             '<div class="report_inwrap">';
    html +=                 '<a class="btn_report" href="#">情報に誤りがありましたらご一報下さい。</a>';
    html +=                 '<div class="report_cont">';
    html +=                     '<textarea class="textarea" id="errorText" name="errorText"></textarea>';
    html +=                     '<div class="btn_wrap">';
    html +=                         '<button class="btn-cancel">取り消し</button>';
    html +=                         '<button class="btn-submit">送信</button>';
    html +=                     '</div>';
    html +=                 '</div>';
    html +=             '</div>';
    html +=             '<span class="report_answer display-none">貴重なご意見ありがとうございます。</span>';
    html +=         '</div>';
    html +=         '<input id="type" name="type" type="hidden" value="content">';
    html +=         '<input id="content_id" name="content_id" type="hidden" value="">';
    html +=         '<input id="content_type_id" name="content_type_id" type="hidden" value="">';
    html +=         '<input id="content_title" name="content_title" type="hidden" value="ロマンチックな夜を演出！ ソウル首都圏で楽しむ光のページェント">';
    html +=         '<input id="lang" name="lang" type="hidden" value="jp">';
    html +=     '</form>';
    html +=     '<div class="wrap-loading display-none">';
    html +=         '<div class="loading-img"><img src="/static/_images/app3.0/icon_translating@3x.png"></div>';
    html +=         '<div class="loading-txt">TRANSLATING, PLEASE WAIT</div>';
    html +=     '</div>';
    html += '</div>';
    $body.append(html);


    $head.append('<title>Visit Korea</title>');
    $head.append('<meta content="text/html; charset=utf-8" http-equiv="Content-Type">');
    $head.append('<meta content="telephone=no" name="format-detection">');
    $head.append('<meta content="width=device-width,initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,user-scalable=no,target-densitydpi=high-dpi" name="viewport">');
    $head.append('<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">');
    $head.append('<link rel="stylesheet" type="text/css" href="http://m.app.visitkorea.or.kr/static/_styles/yun_plus.css">');
    $head.append('<link rel="stylesheet" type="text/css" href="http://m.app.visitkorea.or.kr/static/_styles/mobile.css">');
    $head.append('<link rel="stylesheet" type="text/css" href="http://m.app.visitkorea.or.kr/static/_styles/common_v1708.css">');
    $head.append('<link rel="stylesheet" type="text/css" href="http://m.app.visitkorea.or.kr/static/_styles/common_v1810.css">');
    $head.append('<script charset="utf-8" type="text/javascript" src="http://m.app.visitkorea.or.kr/static/_scripts/common/jquery-2.0.2.min.js"></script>');
    $head.append('<script charset="utf-8" type="text/javascript" src="http://m.app.visitkorea.or.kr/static/_scripts/innerlink.js"></script>');
    $head.append('<script charset="utf-8" type="text/javascript" src="http://m.app.visitkorea.or.kr/static/_scripts/common/common.js"></script>');
    $head.append('<script src="http://m.app.visitkorea.or.kr/static/_scripts/jquery.number.min.js"></script>');
};