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
Maybe.lift = fn => val => new Maybe(fn(val));
var addOne = val => val + 1;
var maybeAddOne = Maybe.lift(addOne);


Maybe.lift2 = fn => (M1, M2) => new Maybe(M1.bind(val1 => M2.bind(val2 => fn(val1, val2))));

var add = (a, b) => a + b;
var m1 = new Maybe(1);
var m2 = new Maybe(2);
var m3 = new Maybe(undefined);

var liftM2Add = Maybe.lift2(add);



console.log(liftM2Add(m1, m2).ret()); //3
console.log(liftM2Add(m3, m2).ret()); //undefined
console.log(liftM2Add(m1, m3).ret()); //undefined
