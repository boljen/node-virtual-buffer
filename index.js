"use strict";

/**
 * The virtual buffer stores buffers inside a cache and allows you to read from
 * the "virtual" concatenated buffer in an efficient way.
 */
var VirtualBuffer = function() {
  this.b = [];
  this.length = 0;
};

VirtualBuffer.prototype.push = function(b) {
  this.b.push(b);
  this.length+= b.length;
};

VirtualBuffer.prototype.readable = function(length) {
  return (this.length >= length);
};

VirtualBuffer.prototype.read = function(length) {
  if (this.length < length) {
    return null;
  } else {
    return this.compile(length);
  }
};

VirtualBuffer.prototype.compile = function(length) {
  var remaining = length;
  var result = new Buffer(length);
  var pos = 0;
  var slicer = 0;

  for (var i = 0; i < this.b.length; i++) {
    if (this.b[i].length > remaining) {
      this.b[i].copy(result, pos, 0, remaining);
      this.b[i] = this.b[i].slice(remaining, this.b[i].length);
    } else {
      this.b[i].copy(result, pos, 0, this.b[i].length);
      remaining -= this.b[i].length;
      pos+= this.b[i].length;
      slicer++;
    }
    if (remaining === 0) {
      break;
    }
  }

  this.length -= length;
  this.b = this.b.slice(slicer);

  return result;

};

module.exports = VirtualBuffer;
