var t2;
(function (t2) {
    var readlineSync = require('readline-sync');
    var Messenger = (function () {
        function Messenger() {
            this.message = "Hello World";
        }
        Messenger.prototype.start = function () {
            var _this = this;
            setTimeout(function () {
                console.log(_this.message);
                readlineSync.question('hit enter to exit? :');
            }, 500);
        };
        return Messenger;
    }());
    var messenger = new Messenger();
    messenger.start();
})(t2 || (t2 = {}));
