var Piping;
(function (Piping) {
    var readlineSync = require('readline-sync');
    ;
    var MapPipe = (function () {
        function MapPipe(accessorfnc, reducerfnc, mapperfnc) {
            var _this = this;
            this.pump = function (curVal, theArr) {
                return _this.mapperfnc(curVal, theArr.reduce(_this.reducerfnc(_this.accessorfnc), {}));
            };
            this.accessorfnc = accessorfnc;
            this.reducerfnc = reducerfnc;
            this.mapperfnc = mapperfnc;
        }
        return MapPipe;
    })();
    var getExt0 = function (acc) {
        return function (prv, curelement, idx, theAr) {
            var valtempval = acc(curelement);
            if (prv.max === undefined)
                prv.max = -99999999;
            if (prv.min === undefined)
                prv.min = 99999999;
            prv.max = (prv.max < valtempval ? valtempval : prv.max);
            prv.min = (prv.min > valtempval ? valtempval : prv.min);
            return prv;
        };
    };
    var numberAccessor = function (curelement) { return curelement; };
    var c42 = new MapPipe(numberAccessor, getExt0, mapValue);
    console.log(c1.pump(6, [0, 3, 5, 7, 8, 9, 12]));
    var getExt = function (acc) {
        return function (prv, curelement, idx, theAr) {
            var valtempval = acc(curelement);
            if (prv.max === undefined)
                prv.max = -99999999;
            if (prv.min === undefined)
                prv.min = 99999999;
            prv.max = (prv.max < valtempval ? valtempval : prv.max);
            prv.min = (prv.min > valtempval ? valtempval : prv.min);
            return prv;
        };
    };
    var getExt2 = function (acc) {
        return function (prv, curelement, idx, theAr) {
            var valtempval = acc(curelement);
            if (prv.max === undefined)
                prv.max = -99999999;
            if (prv.min === undefined)
                prv.min = 99999999;
            prv.max = (prv.max < valtempval ? valtempval : prv.max);
            prv.min = (prv.min > valtempval ? valtempval : prv.min);
            return prv;
        };
    };
    var mapValue = function (val, reducerRes) {
        var interval = reducerRes.max - reducerRes.min;
        var fraction = (val - reducerRes.min) / interval;
        return fraction;
    };
    var numberAccessor = function (curelement) { return curelement; };
    var c1 = new MapPipe(numberAccessor, getExt, mapValue);
    console.log(c1.pump(6, [0, 3, 5, 7, 8, 9, 12]));
    var numberInObjAccessor = function (curelement) { return curelement.value; };
    var c2 = new MapPipe(numberInObjAccessor, getExt2, mapValue);
    console.log(c2.pump(6, [{ value: 4 }, { value: 3 }, { value: 5 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 12 }]));
    readlineSync.question('hit enter to exit? :');
})(Piping || (Piping = {}));
;
