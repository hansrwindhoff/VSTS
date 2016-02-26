/* @ flow */
// this make flow analyse this file!!!
// es6
var t2;
(function (t2) {
    var HaveAGetSet = (function () {
        function HaveAGetSet() {
        }
        Object.defineProperty(HaveAGetSet.prototype, "aNumber", {
            get: function () {
                return this._aNumber;
            },
            set: function (val) {
                this._aNumber = val;
            },
            enumerable: true,
            configurable: true
        });
        return HaveAGetSet;
    }());
    var t1 = new HaveAGetSet();
    t1.aNumber = 42;
    console.log(t1.aNumber);
})(t2 || (t2 = {}));
//# sourceMappingURL=A_getset.js.map