var dest;
(function (dest) {
    "use strict";
    var getSomeObject = function () { return { a: 10, b: 20, c: 30 }; };
    var getSomeArray = function () { return [23, 34, 45]; };
    var _a = getSomeObject(), a = _a.a, c = _a.c, b = _a.b;
    var _b = getSomeArray(), aa = _b[0], cc = _b[1], bb = _b[2];
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(aa);
    console.log(bb);
    console.log(cc);
})(dest || (dest = {}));
//# sourceMappingURL=A_destructuring.js.map