var VB = require('./');

var vb = new VB();

vb.push(new Buffer('test'));

if (vb.readable(3)) {
  console.log(vb.read(3).toString());
}
