/* @flow */
// this make flow analyse this file!!!
var Typeassertions;
(function (Typeassertions) {
    var u = { a: [2, 3, -24], b: [2, 3, 4], c: [2, 3, 4] };
    var v = { a: [2, 3, 4], b: [2, 3, 4] };
    var w = { a: [2, 3, 4] };
    u = w; // type assertion
    console.log(u);
    u = w; // using an anonymous type
    console.log(u);
    var u2 = { a: [2, 3, 4], b: [2, 3, 4], c: [2, 3, 4] };
    var v2 = { a: [2, 3, 4], b: [2, 3, 4] };
    var w2 = { a: [2, 3, 4] };
    console.log(u2);
    w2 = u2;
    //u2 =  w;
    console.log("end");
})(Typeassertions || (Typeassertions = {}));
//# sourceMappingURL=B_typeassertion2.js.map