!function() {
	var label_image = {
        food: {
            enu: {
                  'Level 1': 'http://vkem.wacc.skcdn.com/vkem/inssa/ico_inssa_lev1_en.png'
                , 'Level 2': 'http://vkem.wacc.skcdn.com/vkem/inssa/ico_inssa_lev2_en.png'
                , 'Level 3': 'http://vkem.wacc.skcdn.com/vkem/inssa/ico_inssa_lev3_en.png'
                , 'Level 4': 'http://vkem.wacc.skcdn.com/vkem/inssa/ico_inssa_lev4_en.png'
                , 'Level 5': 'http://vkem.wacc.skcdn.com/vkem/inssa/ico_inssa_lev5_en.png'
            },
            jpn: {
                  'レベル1': 'http://vkem.wacc.skcdn.com/vkjp/inssa/ico_inssa_lev1_jp.png'
                , 'レベル2': 'http://vkem.wacc.skcdn.com/vkjp/inssa/ico_inssa_lev2_jp.png'
                , 'レベル3': 'http://vkem.wacc.skcdn.com/vkjp/inssa/ico_inssa_lev3_jp.png'
                , 'レベル4': 'http://vkem.wacc.skcdn.com/vkjp/inssa/ico_inssa_lev4_jp.png'
                , 'レベル5': 'http://vkem.wacc.skcdn.com/vkjp/inssa/ico_inssa_lev5_jp.png'
            },
            chs: {
                  '1阶段': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_lev1_cn.png'
                , '2阶段': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_lev2_cn.png'
                , '3阶段': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_lev3_cn.png'
                , '4阶段': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_lev4_cn.png'
                , '5阶段': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_lev5_cn.png'
            },
            cht: {
                  '等級1': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_lev1_cn.png'
                , '等級2': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_lev2_cn.png'
                , '等級3': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_lev3_cn.png'
                , '等級4': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_lev4_cn.png'
                , '等級5': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_lev5_cn.png'
            }
        },
        activity: {
            enu: {
                  'Cultural': 'http://vkem.wacc.skcdn.com/vkem/inssa/ico_inssa_culture_en.png'
                , 'Sports': 'http://vkem.wacc.skcdn.com/vkem/inssa/ico_inssa_sports_en.png'
                , 'Daily Life': 'http://vkem.wacc.skcdn.com/vkem/inssa/ico_inssa_life_en.png'
                , 'K-Beauty': 'http://vkem.wacc.skcdn.com/vkem/inssa/ico_inssa_beauty_en.png'
                , 'Hallyu': 'http://vkem.wacc.skcdn.com/vkem/inssa/ico_inssa_hallyu_en.png'
            },
            jpn: {
                  '文化': 'http://vkem.wacc.skcdn.com/vkjp/inssa/ico_inssa_culture_jp.png'
                , 'スポーツ': 'http://vkem.wacc.skcdn.com/vkjp/inssa/ico_inssa_sports_jp.png'
                , '日常': 'http://vkem.wacc.skcdn.com/vkjp/inssa/ico_inssa_life_jp.png'
                , 'K-ビューティ': 'http://vkem.wacc.skcdn.com/vkjp/inssa/ico_inssa_beauty_jp.png'
                , '韓流': 'http://vkem.wacc.skcdn.com/vkjp/inssa/ico_inssa_hallyu_jp.png'
            },
            chs: {
                  '文化': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_culture_cn.png'
                , '休闲运动': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_sports_cn.png'
                , '日常': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_life_cn.png'
                , '韩式美妆': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_beauty_cn.png'
                , '韩流': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_hallyu_cn.png'
            },
            cht: {
                  '文化體驗': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_culture_cn.png'
                , '休閒運動體驗': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_sports_cn.png'
                , '旅遊日常體驗': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_life_cn.png'
                , 'K-Beauty 韓式美妝體驗': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_beauty_cn.png'
                , '韓流體驗': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_hallyu_cn.png'
            }
        },
        shopping: {
            enu: {
                  'household': 'http://vkem.wacc.skcdn.com/vkem/inssa/ico_inssa_sh_house_en.png'
                , 'Food': 'http://vkem.wacc.skcdn.com/vkem/inssa/ico_inssa_sh_food_en.png'
                , 'souvenirs': 'http://vkem.wacc.skcdn.com/vkem/inssa/ico_inssa_sh_souvenir_en.png'
                , 'beauty': 'http://vkem.wacc.skcdn.com/vkem/inssa/ico_inssa_sh_beauty_en.png'
                , 'fashion': 'http://vkem.wacc.skcdn.com/vkem/inssa/ico_inssa_sh_fashion_en.png'
            },
            jpn: {
                  '家電・生活雑貨': 'http://vkem.wacc.skcdn.com/vkjp/inssa/ico_inssa_sh_house_jp.png'
                , '食品': 'http://vkem.wacc.skcdn.com/vkjp/inssa/ico_inssa_sh_food_jp.png'
                , 'おみやげ': 'http://vkem.wacc.skcdn.com/vkjp/inssa/ico_inssa_sh_souvenir_jp.png'
                , 'ビューティ': 'http://vkem.wacc.skcdn.com/vkjp/inssa/ico_inssa_sh_beauty_jp.png'
                , 'ファッション': 'http://vkem.wacc.skcdn.com/vkjp/inssa/ico_inssa_sh_fashion_jp.png'
            },
            chs: {
                  '生活/家电购物': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_sh_house_cn.png'
                , '食品购物': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_sh_food_cn.png'
                , '纪念品购物': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_sh_souvenir_cn.png'
                , '美妆购物': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_sh_beauty_cn.png'
                , '时尚/ 服饰购物': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_sh_fashion_cn.png'
            },
            cht: {
                  '購買生活用品/ 家電': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_sh_house_cn.png'
                , '購買食品': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_sh_food_cn.png'
                , '購買紀念品': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_sh_souvenir_cn.png'
                , '購買美妝用品': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_sh_beauty_cn.png'
                , '購買時尚配件/ 服飾': 'http://vkem.wacc.skcdn.com/vkcn/inssa/ico_inssa_sh_fashion_cn.png'
            }
        }
	};

    label_image.get = function(category, language, type) {
        console.log(category + ', ' + language + ', ' + type);
        var url = '';
        Object.keys(label_image).forEach(function(c) {
            if ( c == category ) {
                var cate = label_image[c];
                console.log(cate);
                Object.keys(cate).forEach(function(l) {
                    if ( l == language) {
                        var lang = cate[l];
                        console.log(lang);
                        Object.keys(lang).forEach(function(t) {
                            if ( t.toLocaleLowerCase() == type.toLocaleLowerCase() ) {
                                url = lang[t];
                                return false;
                            }
                        });
                        return false;
                    }
                });
                return false;
            }
        });
        return url;
    };

    this.label_image = label_image;
}();