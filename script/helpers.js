'use strict';

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

const checkNumber = n => !isNaN(parseInt(n)) && isFinite(n);

function isEmpty(s) {
    if (s === '') {
        return true;
    } else {
        return false;
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = isNumber;

