'use strict';
var name = 'node test ';
var s = 'hello ' + name + '!';
var hh = `hh ${s}`;
console.log(s);

function greet(namestring){
    console.log(name + namestring);
}

module.exports = greet;