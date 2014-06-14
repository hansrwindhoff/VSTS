//lexically scoped  or dynamically scoped
// console.log(this);
var Messenger = (function () {
    function Messenger() {
        this.message = "Hello World";
    }
    Messenger.prototype.start = function () {
        //var _this=this;
        setTimeout(function () {
            console.log(this.message);
            console.log(this);
        }, 500);
    };
    return Messenger;
})();

var messenger = new Messenger();
messenger.start();
