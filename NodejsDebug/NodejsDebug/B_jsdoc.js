var My;
(function (My) {
    var Namespace;
    (function (Namespace) {
        var SomeClass = (function () {
            function SomeClass(value) {
                this.nojsdocField = null;
                this._someField = null;
            }
            SomeClass.prototype._someMethod = function () {
                this._someField;
                this.nojsdocField;
            };
            SomeClass.prototype._someOtherMethod = function (v1) {
            };
            return SomeClass;
        }());
        Namespace.SomeClass = SomeClass;
    })(Namespace = My.Namespace || (My.Namespace = {}));
})(My || (My = {}));
var test = new My.Namespace.SomeClass(true);
test._someOtherMethod([1]);
console.log('end');
//# sourceMappingURL=B_jsdoc.js.map