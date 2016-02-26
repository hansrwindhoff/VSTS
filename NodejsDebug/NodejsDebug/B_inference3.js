/* @ flow */
// this make flow analyse this file!!!
var InferenceWithGenerix;
(function (InferenceWithGenerix) {
    // please these are just the types!!!
    // now some objects that implement the above interfaces
    // we can do this (explictely setting the interface)
    // var u:ImyextendedObj	={a:[2,3,4], b:[2,3,4] , c:[2,3,4] };
    // var v:ImyextendedObj	={a:[2,3,4], b:[2,3,4] };
    // var w:ImybaseObj	={a:[2,3,4]};
    // or this way (implicitely typed) , infered
    var u = { a: [2, 3, -24], b: [2, 3, 4], c: [2, 3, 4] };
    var v = { a: [2, 3, 4], b: [2, 3, 4] };
    var w = { a: [2, 3, 4] };
    // console.log("u is a "+ typeof u);
    // console.log(u);
    // and a function that implements Ifct3
    // so here we type the var t3
    var f3; //ts knows that the type parameters are constraint
    //to the base type interface,
    //var t3: Ifct3<number[], I2ndmyextendedObj>; // try this
    // and because it is typed already ts knows that the function that is being assigned to f3
    // has the above types
    f3 = function (d, cb) {
        var ret = d; // we are returning I2ndmyextendedObj
        ret.sumOverAGreaterZero = cb(d); // call the callback
        //ret.testedCondition = cb(d);
        return ret;
    };
    //ts knows that v is constraint to the base type interface,
    //try putting it to w, that doesnt work,  because w is not of type ImyextendedObj
    //try putting {d:[1,2,3,4]} which doesnt fullfill the type requirement
    //but u works
    // ... now we are calling it
    var x = f3(u, function (d) {
        var sumoverarry = 0;
        sumoverarry = d.a.reduce(function (prv, cur, i, theAr) { return prv + cur; }); // try changing a => c
        console.log(sumoverarry);
        var ret = sumoverarry > 0 ? true : false;
        //var ret =1;
        return ret;
        //return {label:"sumoverAGreaterZero", condition:ret};
    });
    console.log(x);
    console.log("end");
})(InferenceWithGenerix || (InferenceWithGenerix = {}));
//# sourceMappingURL=B_inference3.js.map