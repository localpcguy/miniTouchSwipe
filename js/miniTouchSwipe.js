/*-------------------------------
miniTouchSwipe.js
Enlighten mini Touch Swipe Plugin
v.0.1a - 08/23/2012

Requires: jQuery
Documentation:    
Examples:         
-------------------------------*/
(function miniTouchSwipe($, opts) {
    var ua = navigator.userAgent,
        isDroidTablet = ((ua.toLowerCase().indexOf("android 3.1") >= 0 || ua.toLowerCase().indexOf("android 3.2") >= 0) && ua.toLowerCase().indexOf("mobile") <= 0),
        touches = {
            touchstart: { x: -1, y: -1 },
            touchmove: { x: -1, y: -1 },
            touchend: false,
            direction: 'undetermined',
            touchStarted: false
        },
        touchHandler = function (event) {
            var orgEvent = event.originalEvent,
                target = event.target;

            if (typeof orgEvent !== 'undefined') {
                try {
                    var touch = orgEvent.touches[0];
                    switch (orgEvent.type) {
                        case 'touchstart':
                            if (!touches.touchStarted) {
                                touches.touchstart.x = -1;
                                touches.touchmove.x = -1;
                                touches.touchstart.y = -1;
                                touches.touchmove.y = -1;
                                if (typeof touch != 'undefined') {
                                    touches.touchmove.x = touch.pageX;
                                    touches.touchmove.y = touch.pageY;
                                }
                            }
                            if (typeof touch != 'undefined') {
                                touches.touchstart.x = touch.pageX;
                                touches.touchstart.y = touch.pageY;
                                touches.touchStarted = true;
                            }
                            break;
                        case 'touchmove':
                            if (typeof touch != 'undefined') {
                                touches.touchmove.x = touch.pageX;
                                touches.touchmove.y = touch.pageY;
                            }
                            if (isDroidTablet) {
                                touches.touchend = true;
                                if (touches.touchstart.x > -1 && touches.touchmove.x > -1) {
                                    if (touches.touchstart.x < touches.touchmove.x && touches.touchmove.x - touches.touchstart.x > options.marginOfError) {
                                        touches.direction = 'right';
                                    }
                                    else if (touches.touchstart.x > touches.touchmove.x && touches.touchstart.x - touches.touchmove.x > options.marginOfError) {
                                        touches.direction = 'left';
                                    } else {
                                        touches.direction = 'none';
                                    }
                                    touches.touchStarted = false;
                                }
                            }
                            event.preventDefault();
                            break;
                        case 'touchend':
                            touches.touchend = true;
                            if (touches.touchstart.x > -1 && touches.touchmove.x > -1) {
                                if (touches.touchstart.x < touches.touchmove.x && touches.touchmove.x - touches.touchstart.x > options.marginOfError) {
                                    touches.direction = 'right';
                                } else if (touches.touchstart.x > touches.touchmove.x && touches.touchstart.x - touches.touchmove.x > options.marginOfError) {
                                    touches.direction = 'left';
                                } else {
                                    touches.direction = 'none';
                                }
                                touches.touchStarted = false;
                            }
                            break;
                        default:
                            break;
                    }
                }
                catch (err) {
                    //alert(err);
                }
            }
            return typeof options.callback === 'function' ? options.callback(touches) : touches;
        },
        defaults = {
            callback: null,
            marginOfError: 40
        },
        options = $.extend(defaults, opts);

    // Initilize touch listener
    $(document).on('touchstart touchmove touchend', touchHandler);
})(jQuery, { callback: demoSwipe });