var InferenceWithGenerix;
(function (InferenceWithGenerix) {
    var u = { a: [2, 3, -24], b: [2, 3, 4], c: [2, 3, 4] };
    var v = { a: [2, 3, 4], b: [2, 3, 4] };
    var w = { a: [2, 3, 4] };
    var f3;
    f3 = function (d, cb) {
        var ret = d;
        ret.sumOverAGreaterZero = cb(d);
        return ret;
    };
    var x = f3(u, function (d) {
        var sumoverarry = 0;
        sumoverarry = d.a.reduce(function (prv, cur, i, theAr) { return prv + cur; });
        console.log(sumoverarry);
        var ret = sumoverarry > 0 ? true : false;
        return ret;
    });
    console.log(x);
    console.log("end");
})(InferenceWithGenerix || (InferenceWithGenerix = {}));
