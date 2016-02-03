var Gennest;
(function (Gennest) {
    var readlineSync = require('readline-sync');
    var f1;
    f1 = function (a, b) {
        return b + (a() > 0 ? " greater zero" : " <= zero");
    };
    var theAccessor;
    theAccessor = function (data) {
        return function () { return data.reduce(function (prev, cur, idx, arr) {
            return prev + cur;
        }, 0); };
    };
    console.log(f1(theAccessor([1, 2, -3, 4, -5, -6]), "the sum over the array is"));
    var theAccessor2;
    theAccessor2 = function (data) {
        return function () { return data.reduce(function (prev, cur, idx, arr) {
            return prev + cur.value;
        }, 0); };
    };
    console.log(f1(theAccessor2([{ value: 4 }, { value: 3 }, { value: 5 }, { value: 7 }, { value: -8 }, { value: -9 }, { value: -12 }]), "the sum over the values in the array is"));
    readlineSync.question('hit enter to exit? :');
})(Gennest || (Gennest = {}));
