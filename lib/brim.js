/**
 * @version 1.0.11
 * @link https://github.com/gajus/brim for the canonical source repository
 * @license https://github.com/gajus/brim/blob/master/LICENSE BSD 3-Clause
 */
(function e(t, n, r) {
    function s(o, u) {
        if (!n[o]) {
            if (!t[o]) {
                var a = typeof require == "function" && require;
                if (!u && a) return a(o, !0);
                if (i) return i(o, !0);
                throw new Error("Cannot find module '" + o + "'")
            }
            var f = n[o] = {
                exports: {}
            };
            t[o][0].call(f.exports, function(e) {
                var n = t[o][1][e];
                return s(n ? n : e)
            }, f, f.exports, e, t, n, r)
        }
        return n[o].exports
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++) s(r[o]);
    return s
})({
    1: [function(require, module, exports) {
        (function(global) {
            /**
             * @link https://github.com/gajus/sister for the canonical source repository
             * @license https://github.com/gajus/sister/blob/master/LICENSE BSD 3-Clause
             */
            function Sister() {
                var sister = {},
                    events = {};

                /**
                 * @name handler
                 * @function
                 * @param {Object} data Event data.
                 */

                /**
                 * @param {String} name Event name.
                 * @param {handler} handler
                 * @return {listener}
                 */
                sister.on = function(name, handler) {
                    var listener = {
                        name: name,
                        handler: handler
                    };
                    events[name] = events[name] || [];
                    events[name].unshift(listener);
                    return listener;
                };

                /**
                 * @param {listener}
                 */
                sister.off = function(listener) {
                    var index = events[listener.name].indexOf(listener);

                    if (index != -1) {
                        events[listener.name].splice(index, 1);
                    }
                };

                /**
                 * @param {String} name Event name.
                 * @param {Object} data Event data.
                 */
                sister.trigger = function(name, data) {
                    var listeners = events[name],
                        i;

                    if (listeners) {
                        i = listeners.length;
                        while (i--) {
                            listeners[i].handler(data);
                        }
                    }
                };

                return sister;
            }

            global.gajus = global.gajus || {};
            global.gajus.Sister = Sister;

            module.exports = Sister;
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {}],
    2: [function(require, module, exports) {
        (function(global) {
            var Brim,
                Sister = require('sister');

            Brim = function Brim(config) {
                var brim,
                    player = {},
                    viewport,
                    eventEmitter;

                if (!(this instanceof Brim)) {
                    return new Brim(config);
                }

                brim = this;

                if (!config.viewport || !(config.viewport instanceof gajus.Scream)) {
                    throw new Error('Configuration property "viewport" must be an instance of Scream.');
                }

                viewport = config.viewport;

                brim.isEnabled = true;

                /**
                 *
                 */
                brim._setupDOMEventListeners = function() {
                    viewport.on('orientationchangeend', function() {
                        console.log("orientationchangeend");
                        brim._treadmill();
                        // brim._main();
                        brim._mask();
                    });

                    viewport.on('viewchange', function(e) {
                        console.log("viewchange");
                        // brim._main();
                        brim._mask();

                        eventEmitter.trigger('viewchange', e);
                    });

                    brim._main();
                    brim._mask();

                    // Disable window scrolling when in minimal view.
                    // @see http://stackoverflow.com/a/26853900/368691
                    (function() {
                        var firstMove;

                        global.document.addEventListener('touchstart', function(e) {
                            console.log("touch");
                            firstMove = true;
                        });

                        global.document.addEventListener('touchmove', function(e) {
                            if (viewport.isMinimalView() && firstMove) {
                                console.log("disable touch");
                                // e.preventDefault();
                                firstMove = false;
                            }


                        });
                    }());
                };

                /**
                 * Setting the offset ensures that "resize" event is triggered upon loading the page.
                 * A large (somewhat arbitrary) offset ensures that the page view does not change after device orientation.
                 *
                 * @see http://stackoverflow.com/questions/26784456/how-to-get-window-height-when-in-fullscreen
                 */
                brim._treadmill = function() {
                    global.scrollTo(0, 1000);
                };

                /**
                 * Sets the dimensions and position of the drag mask player. The mask is an overlay on top
                 * of the treadmill and the main content.
                 *
                 * The mask is visible when view is full.
                 */
                brim._mask = function() {
                    if (viewport.isMinimalView()) {
                        player.mask.style.display = 'none';
                    }
                    else {
                        player.mask.style.display = 'block';
                        if (!bedbugGameCore.isDisplayingInput) {
                            var el = $("#touchImg");
                            el.css({
                                opacity: 1,
                                display: 'initial'
                            });

                            el.delay(2000).fadeOut("slow", function() {
                                // Animation complete.
                            });
                        }
                        player.mask.style.width = global.innerWidth + 'px';
                        player.mask.style.height = (global.innerHeight * 2) + 'px';

                        brim._repaintElement(player.mask);
                    }
                };

                /**
                 * Sets the dimensions and position of the main player.
                 *
                 * The main element remains visible beneath the mask.
                 */
                brim._main = function() {
                    player.main.style.width = global.innerWidth + 'px';
                    player.main.style.height = global.innerHeight + 'px';

                    brim._repaintElement(player.main);
                };

                /**
                 * @return {HTMLElement}
                 */
                brim._makeTreadmill = function() {
                    var treadmill = document.querySelector('#brim-treadmill');

                    if (treadmill) {
                        throw new Error('There is an existing treadmill element.');
                    }

                    treadmill = document.createElement('div');
                    treadmill.id = 'brim-treadmill';

                    document.body.appendChild(treadmill);

                    treadmill.style.visibility = 'hidden';
                    treadmill.style.position = 'relative';
                    treadmill.style.zIndex = 10;
                    treadmill.style.left = 0;

                    // Why make it such a large number?
                    // Huge body height makes the size and position of the scrollbar fixed.
                    treadmill.style.width = '1px';
                    treadmill.style.height = '9999999999999999px';

                    return treadmill;
                };

                /**
                 *
                 */
                brim._makeMask = function() {
                    var mask = document.querySelector('#brim-mask');

                    if (!mask) {
                        throw new Error('Mask element does not exist.');
                    }

                    mask.style.position = 'fixed';
                    mask.style.zIndex = 30;

                    mask.style.top = 0;
                    mask.style.left = 0;

                    return mask;
                };

                /**
                 *
                 */
                brim._makeMain = function() {
                    var main = document.querySelector('#brim-main');

                    if (!main) {
                        throw new Error('Main element does not exist.');
                    }

                    main.style.position = 'fixed';
                    main.style.zIndex = 20;

                    main.style.top = 0;
                    main.style.left = 0;

                    main.style.overflowY = 'scroll';
                    main.style.webkitOverflowScrolling = 'touch';

                    return main;
                };

                brim._makeDOM = function() {
                    player.treadmill = brim._makeTreadmill();
                    player.mask = brim._makeMask();
                    player.main = brim._makeMain();
                };

                /**
                 * Fixed element is not visible outside of the chrome of the pre touch-drag state.
                 * See ./.readme/element-fixed-bug.png as a reminder of the bug.
                 *
                 * @see http://stackoverflow.com/questions/3485365/how-can-i-force-webkit-to-redraw-repaint-to-propagate-style-changes?lq=1
                 */
                brim._repaintElement = function(element) {
                    element.style.webkitTransform = 'translateZ(0)';

                    element.style.display = 'none';
                    element.offsetHeight;
                    element.style.display = 'block';
                };

                eventEmitter = Sister();

                brim.on = eventEmitter.on;

                brim._makeDOM();

                brim._setupDOMEventListeners();
            };

            global.gajus = global.gajus || {};
            global.gajus.Brim = Brim;

            module.exports = Brim;
        }).call(this, typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
    }, {
        "sister": 1
    }]
}, {}, [2])
