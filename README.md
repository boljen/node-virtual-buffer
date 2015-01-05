# Node Virtual Buffer

The virtual buffer stores buffers inside a cache and allows you to read from
the "virtual" concatenated buffer in an efficient way.

## Example

    var VB = require('virtual-buffer');

    var vb = new VB();

    vb.push(new Buffer('test'));

    if (vd.readable(3)) {
      console.log(vb.read(3).toString()); // "tes"
    }


## Api

    /**
     * @class VirtualBuffer
     */
    var VirtualBuffer = function()

    /**
     * This pushes a buffer into the virtual buffer. Note that it uses the
     * actual instance and slices, so beware of not altering the data.
     * @param {Buffer} buffer
     */
    VirtualBuffer.prototype.push(buffer)

    /**
     * Check whether the buffer has "length" amount available to be read.
     * @param {int} length
     * @return {boolean}
     */
    VirtualBuffer.prototype.readable(length)

    /**
     * This will read from the buffer and consume the slice.
     * @param  {int} length
     * @return {Buffer}
     */
    VirtualBuffer.prototype.read = function(length)
