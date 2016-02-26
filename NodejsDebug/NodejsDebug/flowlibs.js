/* @flow */
/// <reference path="typings/tsd.d.ts" />
var pizzas = [
    { title: 'Margherita', vegetarian: true },
    { title: 'Pepperoni', vegetarian: false },
    { title: 'Four cheese', vegetarian: true },
    { title: 'Hawaiian', vegetarian: false },
];
function vegetarianPizzas() {
    return _.filter(pizzas, function (d) { return d.vegetariang; });
    //return _.filter(pizzas, (d)=>{return f});
}
// function foo(x) {
//     return x * 10;
// }
// foo("Hello, world!");
function foo(x) { return this.x; }
var o = { x: 42, f: foo };
var x = o.f();
//# sourceMappingURL=flowlibs.js.map