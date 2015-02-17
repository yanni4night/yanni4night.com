/**
 * Copyright (C) 2015 tieba.baidu.com
 * fontface.js
 *
 * changelog
 * 2015-02-17[10:28:34]:revised
 *
 * @author yinyong02@baidu.com
 * @version 0.1.0
 * @since 0.1.0
 */
(function () {
    'use strict';

    var $hiddenFont = document.getElementById('hidden-font');
    var $noneFont = document.getElementById('none-font');

    var $showHiddenFont = document.getElementById('show-hidden');
    var $showNoneFont = document.getElementById('show-none');

    var setCss = function (dom, cssName, cssValue) {
        dom.style[cssName] = cssValue;
    };
    /**
     * Bind an event to a DOM element.
     *
     * @param  {HTMLElement}   dom
     * @param  {String}   type
     * @param  {Function} fn
     */
    var bindEvent = function (dom, type, fn) {

        if (document.addEventListener) {
            dom.addEventListener(type, fn, false);
        } else if (document.attachEvent) {
            dom.attachEvent('on' + type, fn);
        } else {
            dom['on' + type] = fn;
        }
    };

    bindEvent($showHiddenFont, 'click', function () {
        setCss($hiddenFont, 'visibility', 'visible');
    });
    bindEvent($showNoneFont, 'click', function () {
        setCss($noneFont, 'display', 'block');
    });

})();