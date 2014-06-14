




var u = { a: [2, 3, -24], b: [2, 3, 4], c: [2, 3, 4] };
var v = { a: [2, 3, 4], b: [2, 3, 4] };
var w = { a: [2, 3, 4] };

var t3;

var x = t3(u, function (d) {
    var sumoverarry = 0;

    sumoverarry = d.a.reduce(function (prv, cur, i, theAr) {
        return prv + cur;
    });
    console.log(sumoverarry);
    var ret = sumoverarry > 0 ? true : false;
    return ret;
});

console.log(x);
//# sourceMappingURL=inference4.js.map
