var t1b;
(function (t1b) {
    var complex = { a: 42, b: 43 };
    var fn1 = function (cpx) {
        cpx.a++;
        console.log(cpx.a);
    };
    fn1(complex);
    fn1(complex);
    fn1(complex);
    fn1(complex);
    fn1(complex);
    var simple = 42;
    var fn2 = function (smp) {
        smp++;
        console.log(smp);
    };
    fn2(simple);
    fn2(simple);
    fn2(simple);
    fn2(simple);
    fn2(simple);
})(t1b || (t1b = {}));
