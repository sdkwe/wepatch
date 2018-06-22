!(function (e, t) {
    var timer = 0;

    // https://developer.mozilla.org/samples/domref/dispatchEvent.html
    // createEvent-dispatchEvent and preventDefault example
    function preventDef(event) {
        event.preventDefault();
    }

    function addHandler(ele) {
        $(ele).on('click touchend', preventDef, false);
    }

    function removeHandler(ele) {
        $(ele).off('click touchend', preventDef, false);
    }

    function preventClickRetainPress(ele) {
        $(ele).on({
            touchstart: function () {
                timer = setTimeout(function () {
                    timer = 0;
                    removeHandler(ele)
                }, 500);
                addHandler(ele)
            },
            touchmove: function () {
                clearTimeout(timer);
                timer = 0;
            },
            touchend: function () {
                clearTimeout(timer);
                return false;
            }
        })
    }

    var vp = {
        version: '1.0.0',

        preventClickRetainPress: preventClickRetainPress
    }
    e.WEPATCH = e.VP = vp
})(window)
