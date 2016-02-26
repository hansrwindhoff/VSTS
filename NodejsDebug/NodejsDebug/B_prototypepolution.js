var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/* @fl ow */
// this make flow analyse this file!!!
var c1 = (function () {
    function c1(id1) {
        if (id1 === void 0) { id1 = 1; }
        this.id1 = id1;
        // code...
        this.value = 42;
    }
    return c1;
}());
var c2 = (function (_super) {
    __extends(c2, _super);
    function c2(id2) {
        if (id2 === void 0) { id2 = 0; }
        _super.call(this);
        this.id2 = id2;
        // code...
        //	super.x1 = 3;
    }
    return c2;
}(c1));
var x = new c2(5);
console.log(x);
console.log(x.id1);
console.log(x.hasOwnProperty("id1"));
console.log(x.hasOwnProperty("id2"));
//# sourceMappingURL=B_prototypepolution.js.map