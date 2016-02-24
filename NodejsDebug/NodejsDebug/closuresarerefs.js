var t1b;
(function (t1b) {
    var complex = { a: 42, b: 43 };
    var fn1 = function () {
        complex.a++;
        console.log(complex);
    };
    fn1();
    fn1();
    fn1();
    fn1();
    fn1();
    var simple = 42;
    var fn2 = function () {
        simple++;
        console.log(simple);
    };
    fn2();
    fn2();
    fn2();
    fn2();
    fn2();
})(t1b || (t1b = {}));
//# sourceMappingURL=closuresarerefs.js.map