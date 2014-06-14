var ns;
(function (ns) {
    var MyDate = (function () {
        function MyDate() {
            this.mythisdate = new Date();
            console.log("in constructor");
        }
        MyDate.prototype.toDateString = function () {
            return this.mythisdate.toDateString();
        };
        MyDate.prototype.toTimeString = function () {
            return this.mythisdate.toTimeString();
        };
        MyDate.prototype.toLocaleString = function () {
            return this.mythisdate.toLocaleString();
        };
        MyDate.prototype.toLocaleDateString = function () {
            return this.mythisdate.toLocaleDateString();
        };

        // the extentions
        MyDate.printConsole = function () {
            console.log("printing");
        };
        return MyDate;
    })();
    var md = new MyDate();
    console.log(md.toDateString());
    console.log(md.toTimeString());
    MyDate.printConsole();
})(ns || (ns = {}));
