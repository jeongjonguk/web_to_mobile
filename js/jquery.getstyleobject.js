// Taken from http://upshots.org/javascript/jquery-copy-style-copycss
(function($) {

    $.fn.getStyleObject = function() {

        var dom = this.get(0);

        var style;
        var returns = {};

        if (window.getComputedStyle) {

            var camelize = function(a, b) {
                return b.toUpperCase();
            };

            style = window.getComputedStyle(dom, null);

            for (var i = 0, l = style.length; i < l; i++) {
                var prop = style[i];
                var camel = prop.replace(/\-([a-z])/g, camelize);
                var val = style.getPropertyValue(prop);
                returns[camel] = prop + ':' + val;
            }

            return returns;
        }


        if (dom.currentStyle) {
            console.log('dom current style');
            console.log(dom.currentStyle);

            for (var property in dom.currentStyle) {
                returns[property] = dom.currentStyle[property];
            }

            return returns;
        }

        if (dom.style) {
            console.log('dom style');
            console.log(dom.style);

            for (var property in dom.style) {

                if (typeof dom.style[property] != 'function') {
                    returns[property] = dom.style[property];
                }
            }
            return returns;
        }

        return returns;
    };

})(jQuery);