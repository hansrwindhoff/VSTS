/* @ flow */
// this make flow analyse this file!!!
// function foo(x) {
//     return x * 10;
// }
// foo("Hello, world!");
// Example :simple inference
//
var n = 4;
//n is number, at run time js knows that
console.log(typeof n);
//n = "hello1";
console.log('end');
[1, 2, 3, "4"].map(function (parameter) {
    if (typeof parameter === 'number') {
        parameter;
    }
    else {
        parameter;
    }
});
//# sourceMappingURL=B_inference.js.map