//lexically scoped  or dynamically scoped
// console.log(this);
var Messenger = (function () {
    function Messenger() {
        this.message = "Hello World";
    }
    Messenger.prototype.start = function () {
        var _this = this;
        setTimeout(function () {
            return console.log(_this.message);
        }, 500);
        //function() { console.log(this.message); }		, 500);
    };
    return Messenger;
})();

var messenger = new Messenger();
messenger.start();
