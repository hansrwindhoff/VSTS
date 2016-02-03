var t1a;
(function (t1a) {
    var num = 43;
    var comp = { a: 42, b: 43 };
    (function () {
        console.log(comp);
        console.log(comp.a);
        console.log(comp.b);
        console.log(num);
        var myfunc = function () {
            console.log(comp);
            console.log(num);
            return comp.a + comp.b;
        };
        console.log(myfunc());
        console.log("end");
    })();
    num = 45;
    comp = { a: 142, b: 143 };
    (function () {
        console.log(comp);
        console.log(comp.a);
        console.log(comp.b);
        console.log(num);
        var myfunc = function () {
            console.log(comp);
            console.log(num);
            return comp.a + comp.b;
        };
        console.log(myfunc());
        console.log("end");
    })();
})(t1a || (t1a = {}));
