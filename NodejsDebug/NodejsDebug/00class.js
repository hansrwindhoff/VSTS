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
    var House = (function (_super) {
        __extends(House, _super);
        function House() {
            _super.apply(this, arguments);
        }
        return House;
    }(Building));
    ns.House = House;
    var myHouse = new House();
    myHouse.bedrooms = 3;
    myHouse.floors = 1;
    myHouse.material = "brick";
})(ns || (ns = {}));
var myhouse = new ns.House();
myhouse.bedrooms = 3;
myhouse.floors = 1;
myhouse.material = "brick";
console.log(myhouse);
console.log('end');
