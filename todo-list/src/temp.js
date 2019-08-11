const _ = require('lodash');

const a = {
    b: {
        c: 8
    }
};

const tt = 'b.c';

console.log(a[tt]);
console.log(_.get(a, tt));

