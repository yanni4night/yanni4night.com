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


function Type(e) {
    if (undefined === e) {
        return 'undefined';
    } else if (null === e) {
        return 'null';
    } else if ('number' === typeof e) {
        return 'number';
    } else if ('string' === typeof e) {
        return 'string';
    } else if ('boolean' === typeof e) {
        return 'boolean';
    } else return 'object';
}

function isPositiveZero(e) {
    return 0 === e && 1 / e > 0;
}

function isNegativeZero(e) {
    return 0 === e && 1 / e < 0;
}

function toPrimitive(o, hint) {
    if (hint === 'string') {
        return Object.prototype.toString.call(o);
    }

    return +o;
}

function Equal(l, r) {
    var typeLeft = Type(l);
    var typeRight = Type(r);
    if (typeLeft === typeRight) {
        if ('undefined' === typeLeft) return true;
        else if ('null' === typeLeft) return true;
        else if ('number' === typeLeft) {
            if (isNaN(l) || isNaN(r)) return false;
            else if ((isPositiveZero(l) && isNegativeZero(r)) || (isPositiveZero(r) && isNegativeZero(l))) return true; //
            else if (l === r) return true;
            else return false;
        } else if ('string' === typeLeft) {
            return l === r;
        } else if ('boolean' === typeLeft) {
            return l === r;
        } else if ('object' === typeLeft) {
            return l === r;
        }
    } else {
        if (('null' === typeLeft && 'undefined' === typeRight) || ('undefined' === typeLeft && 'null' === typeRight)) {
            return true;
        } else if ([typeLeft, typeRight].sort() === 'number,string') {
            if ('number' === typeLeft && 'string' === typeRight) {
                return Equal(l, +r);
            } else {
                return Equal(+l, r);
            }
        } else if (!!~[typeLeft, typeRight].indexOf('boolean')) {
            if ('boolean' === typeLeft) {
                return Equal(+l, r);
            } else {
                return Equal(l, +r);
            }
        } else if ('object' === typeLeft && !!~['string', 'number'].indexOf(typeRight)) {
            return Equal(toPrimitive(l, typeRight), r);
        } else if ('object' === typeRight && !!~['string', 'number'].indexOf(typeLeft)) {
            return Equal(toPrimitive(, typeLeft), l);
        } else {
            return false;
        }
    }
}

module.exports = {
    Type: Type,
    Equal: Equal
};