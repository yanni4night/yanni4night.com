/**
 * Copyright (C) 2014 yanni4night.com
 * ==.js
 *
 * changelog
 * 2014-08-29[17:04:25]:authorized
 *
 * @author yanni4night@gmail.com
 * @version 0.1.0
 * @since 0.1.0
 */


var $console = document.getElementById('console');

function log() {
    var $p = document.createElement('p');
    $p.innerHTML = Array.prototype.join.call(arguments, '');
    $console.appendChild($p);
}

log.ret = function(result) {
    var $p = document.createElement('p');
    $p.innerHTML = result ? 'return true' : 'return false';
    $console.appendChild($p);
};

log.clear = function() {
    $console.innerHTML = '';
};


if (!String.prototype.trim) {
    String.prototype.trim = function() {
        return this.replace(/^[\s\xa0\ufeff]*|[\s\xa0\ufeff]*$/m, '');
    }
}

function Type(e) {
    if (undefined === e) {
        return 'Undefined';
    } else if (null === e) {
        return 'Null';
    } else if ('number' === typeof e) {
        return 'Number';
    } else if ('string' === typeof e) {
        return 'String';
    } else if ('boolean' === typeof e) {
        return 'Boolean';
    } else return 'Object';
}

function isPositiveZero(e) {
    return 0 === e && 1 / e > 0;
}

function isNegativeZero(e) {
    return 0 === e && 1 / e < 0;
}

function toPrimitive(o, hint) {
    if (hint === 'String') {
        return o.toString();
    }

    return +o;
}

function Equal(l, r) {
    var typeLeft = Type(l);
    var typeRight = Type(r);

    log('Type(A):', typeLeft, ',Type(B):', typeRight);

    if (typeLeft === typeRight) {
        log('Type(A)==Type(B)');
        if ('Undefined' === typeLeft) {
            log('Type(A) is Undefined');
            log.ret(1);
            return true;
        } else if ('Null' === typeLeft) {
            log('Type(A) is Null');
            log.ret(1);
            return true;
        } else if ('Number' === typeLeft) {
            log('Type(A) is Number');
            if (isNaN(l) || isNaN(r)) {
                log('A or B is NaN');
                log.ret();
                return false;
            } else if ((isPositiveZero(l) && isNegativeZero(r)) || (isPositiveZero(r) && isNegativeZero(l))) {
                log('A is +0 ,B is -0,or oppositely');
                log.ret(1);
                return true;
            } else if (l === r) {
                log('A is the same as B');
                log.ret(1);
                return true;
            } else {
                log.ret();
                return false;
            }
        } else if ('String' === typeLeft) {
            log('Type(a) is String');
            log.ret(l === r);
            return l === r;
        } else if ('Boolean' === typeLeft) {
            log('Type(a) is Boolean');
            log.ret(l === r);
            return l === r;
        } else if ('Object' === typeLeft) {
            log('Type(a) is Object');
            log.ret(l === r);
            return l === r;
        }
    } else {
        log('Type(A)≠Type(B)');
        if (('Null' === typeLeft && 'Undefined' === typeRight) || ('Undefined' === typeLeft && 'Null' === typeRight)) {
            log('A is Null,B is Undefined,or oppositely');
            log.ret(1);
            return true;
        } else if ([typeLeft, typeRight].sort() === 'Number,String') {
            if ('Number' === typeLeft && 'String' === typeRight) {
                log('Type(A) is Number,Type(B) is String');
                log('call A==toNumber(B)');
                return Equal(l, +r);
            } else {
                log('Type(A) is String,Type(B) is Number');
                log('call toNumber(A)==B');
                return Equal(+l, r);
            }
        } else if (!!~[typeLeft, typeRight].indexOf('Boolean')) {
            if ('Boolean' === typeLeft) {
                log('Type(A) is Boolean');
                log('call toNumber(A)==B');
                return Equal(+l, r);
            } else {
                log('Type(B) is Boolean');
                log('call A==toNumber(B)');
                return Equal(l, +r);
            }
        } else if ('Object' === typeLeft && !!~['String', 'Number'].indexOf(typeRight)) {
            log('Type(A) is Object,Type(B) is String or Number');
            log('call toPrimitive(A,' + typeRight + ')==B');
            return Equal(toPrimitive(l, typeRight), r);
        } else if ('Object' === typeRight && !!~['String', 'Number'].indexOf(typeLeft)) {
            log('Type(B) is Object,Type(A) is String or Number');
            log('call A==toPrimitive(B,' + typeLeft + ')');
            return Equal(toPrimitive(r, typeLeft), l);
        } else {
            log.ret()
            return false;
        }
    }
}


document.getElementById('equalForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var leftExpr = document.getElementById('leftvalue').value.trim();
    var rightExpr = document.getElementById('rightvalue').value.trim();
    var l, r;
    try {
        log.clear();
        eval('l=' + leftExpr), eval('r=' + rightExpr)
        Equal(l, r);
    } catch (e) {
        document.getElementById('err').innerHTML = e.message;
    }
}, false);