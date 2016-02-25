/* @flow */
// this make flow analyse this file!!!
var ns65;
(function (ns65) {
    var t1 = { dx: 122, dz: 34534, dy: 088 }; // this works
    console.log(typeof t1); // => type object
    console.log(t1); //  at run time js knows the type, of course, ts knows it at design time: push f1
    t1 = { dz: 34534, dy: 088, dx: 12 }; // this doesnt work
    var v3 = t1;
    t1 = v3; // structure matches so its fine
    console.log('end');
})(ns65 || (ns65 = {}));
//# sourceMappingURL=B_inference2.js.map