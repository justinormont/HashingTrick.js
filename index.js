"use strict";
/* @flow weak */

// Requires
var crypto = require('crypto');

var MAX_SAFE_INTEGER_HEX_LENGTH = Math.floor(Math.log(Number.MAX_SAFE_INTEGER)/Math.log(16));
// ToDo: Add static MD5 init here

function FeatureHashing(k) {
    // @Private variables
    var featureVector = {}, valueCount, length;

    // Init
    if (k > MAX_SAFE_INTEGER_HEX_LENGTH*4 || k < 1 || k !== (k|0)) { throw new Error("Feature vector bit length must be an integer between 1 and " + (MAX_SAFE_INTEGER_HEX_LENGTH*4) + "inclusive."); }
    length = Math.pow(2, k||18); // Feature vector hash of 2^18 is used in Vowpal Wabbit
    valueCount = 0;

    // @Privileged function (public w/ private variable access)
    this.add = add;
    function add(value) {
        var hashHex, hashInt, featureNumber;

        hashHex = crypto.createHash('md5').update(value).digest('hex');
        hashInt = parseInt(hashHex.slice(hashHex.length - MAX_SAFE_INTEGER_HEX_LENGTH), 16); // Low bits of the hash
        featureNumber = hashInt % length;

        if (featureVector[featureNumber] === undefined) { featureVector[featureNumber] = 1; }
        else { featureVector[featureNumber] += 1; }
        valueCount += 1;
    }

    // @Privileged function (public w/ private variable access)
    this.sparseFeatureVector = function() { return featureVector; }

    // @Privileged function (public w/ private variable access)
    this.sparseLength = function() { return Object.keys(featureVector).length; }

    // @Privileged function (public w/ private variable access)
    this.length = function() { return length; }

    // @Privileged function (public w/ private variable access)
    this.fillRatio = function() { return (length / Object.keys(featureVector).length) || 0; }

    // @Privileged function (public w/ private variable access)
    // Note: This includes collisions of the same string being sent multiple timess.
    this.collisions = function() { return valueCount - Object.keys(featureVector).length; }

    // @Privileged function (public w/ private variable access)
    // Note: This includes collisions of the same string being sent multiple timess.
    this.collisionRatio = function() { return (valueCount / Object.keys(featureVector).length - 1) || 0; }

    // @Privileged function (public w/ private variable access)
    this.valueCount = function() { return valueCount; }
}

exports.newFeatureHasher = newFeatureHasher;
function newFeatureHasher(k) {
    return new FeatureHashing(k);
}
