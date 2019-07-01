const un = undefined;

const obj = {
    R: '可用',
    N: '很好',
    [un]: '不好',
};

console.log(obj[null]);
