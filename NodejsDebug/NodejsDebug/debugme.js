var t1c;
(function (t1c) {
    var readlineSync = require('readline-sync');
    var complex = { a: 42, b: 43 };
    var fn1 = function (cpx) {
        var cplinner = cpx;
        cplinner.a++;
        console.log(cplinner.a);
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
    readlineSync.question('hit enter to exit? :');
})(t1c || (t1c = {}));
