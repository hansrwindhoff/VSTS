var Maybe;
Maybe = function (value) {
    this.value = value;
};
Maybe.prototype.ret = function () {
    return this.value;
};
Maybe.prototype.bind = function (fn) {
    if (this.value != null)
        return fn(this.value);
    return this.value;
};
Maybe.lift = function (fn) { return function (val) { return new Maybe(fn(val)); }; };
var addOne = function (val) { return val + 1; };
var maybeAddOne = Maybe.lift(addOne);
Maybe.lift2 = function (fn) { return function (M1, M2) { return new Maybe(M1.bind(function (val1) { return M2.bind(function (val2) { return fn(val1, val2); }); })); }; };
var add = function (a, b) { return a + b; };
var m1 = new Maybe(1);
var m2 = new Maybe(2);
var m3 = new Maybe(undefined);
var liftM2Add = Maybe.lift2(add);
console.log(liftM2Add(m1, m2).ret());
console.log(liftM2Add(m3, m2).ret());
console.log(liftM2Add(m1, m3).ret());
//# sourceMappingURL=monads.js.map