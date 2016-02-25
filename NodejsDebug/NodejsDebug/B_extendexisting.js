/* @flow */
// this make flow analyse this file!!!
var nsDate;
(function (nsDate) {
    var RichDate = (function () {
        function RichDate() {
        }
        RichDate.MinValue = new Date();
        return RichDate;
    }());
    Date.prototype.MinValue = new Date(0);
    var x = new Date();
    console.log(x.MinValue);
    Date['MinValue'] = new Date(0);
    var y = Date; // We aren't using an instance
    console.log(y.MinValue);
    var t2;
    var t3 = {};
})(nsDate || (nsDate = {}));
//# sourceMappingURL=B_extendexisting.js.map