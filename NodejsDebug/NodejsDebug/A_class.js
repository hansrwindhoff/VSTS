var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ns;
(function (ns) {
    var num;
    var Building = (function () {
        function Building() {
        }
        return Building;
    }());
    ns.Building = Building;
    var House1 = (function (_super) {
        __extends(House1, _super);
        function House1() {
            _super.apply(this, arguments);
        }
        return House1;
    }(Building));
    ns.House1 = House1;
    var myHouse = new House1();
    myHouse.bedrooms = 3;
    myHouse.floors = 1;
    myHouse.material = "brick";
})(ns || (ns = {}));
var myhouse = new ns.House1();
myhouse.bedrooms = 3;
myhouse.floors = 1;
myhouse.material = "brick";
console.log(myhouse);
console.log('end');
//# sourceMappingURL=A_class.js.map