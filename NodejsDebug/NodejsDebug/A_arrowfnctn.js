// es6
/* @ flow */
// this make flow analyse this file!!!
var t2;
(function (t2) {
    //lexically scoped  or dynamically scoped
    var Messenger = (function () {
        function Messenger() {
            this.message = "Hello World";
        }
        Messenger.prototype.start = function () {
            var _this = this;
            setTimeout(function () {
                console.log(_this.message);
            }, 1500);
        };
        return Messenger;
    }());
    var messenger = new Messenger();
    messenger.start();
})(t2 || (t2 = {}));
//# sourceMappingURL=A_arrowfnctn.js.map