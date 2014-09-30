/**
 * Copyright (C) 2014 yanni4night.com
 * live.js
 *
 * changelog
 * 2014-09-30[15:52:22]:authorized
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */
(function() {

    var $ulList = document.getElementById('ul-list');
    var $lis = document.getElementsByTagName('li');
    var preLen = $lis.length,
        latLen;

    $ulList.appendChild(document.createElement('li'));

    document.getElementById('console').innerHTML = (preLen === (latLen = $lis.length)) ? 'Static' : 'Alive';

})();