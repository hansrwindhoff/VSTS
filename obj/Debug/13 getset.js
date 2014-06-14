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
})();

var t1 = new HaveAGetSet();
T1.aNumber = 42;
console.log(T1.aNumber);
//# sourceMappingURL=13 getset.js.map
