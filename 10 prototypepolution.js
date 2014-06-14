var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var c1 = (function () {
    function c1(id1) {
        if (typeof id1 === "undefined") { id1 = 1; }
        this.id1 = id1;
        // code...
        this.value = 42;
    }
    return c1;
})();

var c2 = (function (_super) {
    __extends(c2, _super);
    function c2(id2) {
        if (typeof id2 === "undefined") { id2 = 0; }
        _super.call(this);
        this.id2 = id2;

        // code...
        _super.prototype.x1 = 3;
    }
    return c2;
})(c1);

var x = new c2(5);
console.log(x.id1);

console.log(x.hasOwnProperty("id1") === true);
console.log(x.hasOwnProperty("id2") === true);
