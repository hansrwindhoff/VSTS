/* @flow */
// es6
// this make flow analyse this file!!!
var t2;
(function (t2) {
    //lexically scoped  or dynamically scoped
    var Messenger = (function () {
        function Messenger() {
            this.message = "Hello World";
        }
        Messenger.prototype.start = function () {
            setTimeout(
            // () => {
            //     console.log(this.message);
            // }
            function () {
                console.log(this.message);
            }, 1500);
        };
        return Messenger;
    }());
    var messenger = new Messenger();
    messenger.start();
})(t2 || (t2 = {}));
//# sourceMappingURL=A_arrowfnctn.js.map