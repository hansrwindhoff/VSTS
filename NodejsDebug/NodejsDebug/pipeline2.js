var assert = require("assert");
var MapPipeline;
(function (MapPipeline) {
    var readlineSync = require("readline-sync");
    var MapPipe = (function () {
        function MapPipe(accessor, reducerfnc, mapperfnc) {
            this._accessor = accessor;
            this._reducerfnc = reducerfnc;
            this._mapperfnc = mapperfnc;
        }
        MapPipe.prototype.pump = function (curVal, theArr, seedReducer, targetRange) {
            return this._mapperfnc(curVal, theArr.reduce(this._reducerfnc(this._accessor), seedReducer), targetRange);
        };
        MapPipe.prototype.pumpC = function (theArr, seedReducer, targetRange) {
            var _this = this;
            var tempReducerResult = theArr.reduce(this._reducerfnc(this._accessor), seedReducer);
            return function (curVal) {
                return _this._mapperfnc(curVal, tempReducerResult, targetRange);
            };
        };
        return MapPipe;
    })();
    var zeroPadX = function (num, size) {
        var s = "000000000" + num.toString(16);
        return s.substr(s.length - size);
    };
    var limitto8Bit = function (val) {
        val = parseInt(val.toString());
        return (Math.max(Math.min(val, 255), 0));
    };
    ;
    var linearMapper = function (val, minMaxOfInterval, destLeftRight) {
        var intervalSrc = minMaxOfInterval.max - minMaxOfInterval.min;
        var intervaldest = destLeftRight.right - destLeftRight.left;
        var fraction = (val - minMaxOfInterval.min) / intervalSrc;
        return destLeftRight.left + (fraction * intervaldest);
    };
    var getExtrema = function (curVal, theExtrema) {
        theExtrema.max = (theExtrema.max < curVal ? curVal : theExtrema.max);
        theExtrema.min = (theExtrema.min > curVal ? curVal : theExtrema.min);
        return theExtrema;
    };
    ;
    var getExtremaFromNumberArrayReducer = function (acc) { return function (prv, curelement) {
        var valtempval = acc(curelement);
        return getExtrema(valtempval, prv);
    }; };
    var mapPipe42 = new MapPipe(function (curelement) { return curelement; }, getExtremaFromNumberArrayReducer, linearMapper);
    var sourceArr = [0, 3, 5, 24, 8, 9, 12];
    console.log("array of numbers, one shot");
    console.log(mapPipe42.pump(6, sourceArr, { min: Infinity, max: -Infinity }, { left: 0, right: 100 }));
    console.log(mapPipe42.pump(6, sourceArr, { min: Infinity, max: -Infinity }, { left: -1000, right: 0 }));
    console.log(mapPipe42.pump(6, sourceArr, { min: Infinity, max: -Infinity }, { left: -1, right: 1 }));
    console.log(mapPipe42.pump(6, sourceArr, { min: Infinity, max: -Infinity }, { left: -1, right: 0 }));
    console.log(mapPipe42.pump(-6, sourceArr, { min: Infinity, max: -Infinity }, { left: 0, right: 100 }));
    console.log(mapPipe42.pump(-6, sourceArr, { min: Infinity, max: -Infinity }, { left: -1000, right: 0 }));
    console.log(mapPipe42.pump(-6, sourceArr, { min: Infinity, max: -Infinity }, { left: -1, right: 1 }));
    console.log(mapPipe42.pump(-6, sourceArr, { min: Infinity, max: -Infinity }, { left: -1, right: 0 }));
    console.log(mapPipe42.pump(24, sourceArr, { min: Infinity, max: -Infinity }, { left: 0, right: 100 }));
    console.log(mapPipe42.pump(24, sourceArr, { min: Infinity, max: -Infinity }, { left: -1000, right: 0 }));
    console.log(mapPipe42.pump(24, sourceArr, { min: Infinity, max: -Infinity }, { left: -1, right: 1 }));
    console.log(mapPipe42.pump(24, sourceArr, { min: Infinity, max: -Infinity }, { left: -1, right: 0 }));
    console.log("map one value through array of numbers, but only run the reducer once and then reuse the result to map values from multiple calls (curried)");
    var pushThrough = mapPipe42.pumpC(sourceArr, { min: Infinity, max: -Infinity }, { left: 0, right: 100 });
    console.log(pushThrough(6));
    console.log(pushThrough(1));
    console.log(pushThrough(0));
    console.log(pushThrough(100));
    console.log(pushThrough(1000));
    console.log(pushThrough(-1000));
    var pushThrough2 = mapPipe42.pumpC(sourceArr, { min: Infinity, max: -Infinity }, { left: 0, right: 1000 });
    console.log(pushThrough2(6));
    console.log(pushThrough2(1));
    console.log(pushThrough2(0));
    console.log(pushThrough2(100));
    console.log(pushThrough2(1000));
    console.log(pushThrough2(-1000));
    var pipe43Reducer = function (acc) { return function (prv, curelement) {
        var valtempval = acc(curelement);
        return getExtrema(valtempval, prv);
    }; };
    var mapPipe43 = new MapPipe(function (curelement) { return curelement.value; }, pipe43Reducer, linearMapper);
    var sourceobjArray = [{ value: 0 }, { value: 3 }, { value: 5 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 12 }];
    console.log("array of objects");
    console.log(mapPipe43.pump(6, sourceobjArray, { min: Infinity, max: -Infinity }, { left: 0, right: 100 }));
    console.log(mapPipe43.pump(6, sourceobjArray, { min: Infinity, max: -Infinity }, { left: -1000, right: 0 }));
    console.log(mapPipe43.pump(6, sourceobjArray, { min: Infinity, max: -Infinity }, { left: -1, right: 1 }));
    console.log(mapPipe43.pump(6, sourceobjArray, { min: Infinity, max: -Infinity }, { left: -1, right: 0 }));
    console.log(mapPipe43.pump(-6, sourceobjArray, { min: Infinity, max: -Infinity }, { left: 0, right: 100 }));
    console.log(mapPipe43.pump(-6, sourceobjArray, { min: Infinity, max: -Infinity }, { left: -1000, right: 0 }));
    console.log(mapPipe43.pump(-6, sourceobjArray, { min: Infinity, max: -Infinity }, { left: -1, right: 1 }));
    console.log(mapPipe43.pump(-6, sourceobjArray, { min: Infinity, max: -Infinity }, { left: -1, right: 0 }));
    console.log(mapPipe43.pump(24, sourceobjArray, { min: Infinity, max: -Infinity }, { left: 0, right: 100 }));
    console.log(mapPipe43.pump(24, sourceobjArray, { min: Infinity, max: -Infinity }, { left: -1000, right: 0 }));
    console.log(mapPipe43.pump(24, sourceobjArray, { min: Infinity, max: -Infinity }, { left: -1, right: 1 }));
    console.log(mapPipe43.pump(24, sourceobjArray, { min: Infinity, max: -Infinity }, { left: -1, right: 0 }));
    console.log("inverse target");
    console.log(mapPipe43.pump(6, sourceobjArray, { min: Infinity, max: -Infinity }, { left: 100, right: 0 }));
    console.log(mapPipe43.pump(6, sourceobjArray, { min: Infinity, max: -Infinity }, { left: 1000, right: 0 }));
    console.log(mapPipe43.pump(6, sourceobjArray, { min: Infinity, max: -Infinity }, { left: 1, right: -1 }));
    console.log(mapPipe43.pump(6, sourceobjArray, { min: Infinity, max: -Infinity }, { left: 1, right: -0 }));
    console.log(mapPipe43.pump(-6, sourceobjArray, { min: Infinity, max: -Infinity }, { left: 100, right: 0 }));
    console.log(mapPipe43.pump(-6, sourceobjArray, { min: Infinity, max: -Infinity }, { left: 1000, right: 0 }));
    console.log(mapPipe43.pump(-6, sourceobjArray, { min: Infinity, max: -Infinity }, { left: 1, right: -1 }));
    console.log(mapPipe43.pump(-6, sourceobjArray, { min: Infinity, max: -Infinity }, { left: 1, right: -0 }));
    console.log(mapPipe43.pump(24, sourceobjArray, { min: Infinity, max: -Infinity }, { left: 100, right: 0 }));
    console.log(mapPipe43.pump(24, sourceobjArray, { min: Infinity, max: -Infinity }, { left: 1000, right: 0 }));
    console.log(mapPipe43.pump(24, sourceobjArray, { min: Infinity, max: -Infinity }, { left: 1, right: -1 }));
    console.log(mapPipe43.pump(24, sourceobjArray, { min: Infinity, max: -Infinity }, { left: 1, right: 0 }));
    console.log(mapPipe43.pump(0, sourceobjArray, { min: Infinity, max: -Infinity }, { left: 100, right: 0 }));
    console.log(mapPipe43.pump(0, sourceobjArray, { min: Infinity, max: -Infinity }, { left: 1000, right: 0 }));
    console.log(mapPipe43.pump(0, sourceobjArray, { min: Infinity, max: -Infinity }, { left: 1, right: -1 }));
    console.log(mapPipe43.pump(0, sourceobjArray, { min: Infinity, max: -Infinity }, { left: 1, right: 0 }));
    console.log(mapPipe43.pump(12, sourceobjArray, { min: Infinity, max: -Infinity }, { left: 100, right: 0 }));
    console.log(mapPipe43.pump(12, sourceobjArray, { min: Infinity, max: -Infinity }, { left: 1000, right: 0 }));
    console.log(mapPipe43.pump(12, sourceobjArray, { min: Infinity, max: -Infinity }, { left: 1, right: -1 }));
    console.log(mapPipe43.pump(12, sourceobjArray, { min: Infinity, max: -Infinity }, { left: 1, right: 0 }));
    console.log("...and the same in curried...");
    console.log("array of objects");
    var t43 = mapPipe43.pumpC(sourceobjArray, { min: Infinity, max: -Infinity }, { left: 0, right: 100 });
    console.log(t43(6));
    console.log(t43(-6));
    console.log(t43(24));
    console.log(t43(0));
    console.log(t43(12));
    console.log("inverse target");
    t43 = mapPipe43.pumpC(sourceobjArray, { min: Infinity, max: -Infinity }, { left: 100, right: 0 });
    console.log(t43(6));
    console.log(t43(-6));
    console.log(t43(24));
    console.log(t43(0));
    console.log(t43(12));
    var sourceStrgArray = ["red", "orange", "yellow", "orange", "green", "blue", "orange", "red", "indigo", "violet", "red", "black", "red", "white"];
    var sourceStrgArrayOfObj = [{ color: "red" }, { color: "orange" }, { color: "yellow" }, { color: "orange" }, { color: "green" }, { color: "blue" }, { color: "orange" },
        { color: "red" }, { color: "indigo" }, { color: "violet" }, { color: "red" }, { color: "black" }, { color: "red" }, { color: "white" }];
    var pipe44Reducer = function (acc) { return function (prv, curelement) {
        var tempstrg = acc(curelement);
        if (prv.indexOf(tempstrg) === -1) {
            prv.push(tempstrg);
        }
        return (prv);
    }; };
    console.log("dedupe an array of strings and return element at position");
    var colorMapper = function (val, uniqueColors) {
        var color = "nocolor";
        if (val < uniqueColors.length && val > -1) {
            color = uniqueColors[val];
        }
        return color;
    };
    var mapPipe44 = new MapPipe(function (curelement) { return curelement; }, pipe44Reducer, colorMapper);
    console.log(mapPipe44.pump(0, sourceStrgArray, [], {}));
    console.log(mapPipe44.pump(5, sourceStrgArray, [], {}));
    console.log(mapPipe44.pump(8, sourceStrgArray, [], {}));
    console.log(mapPipe44.pump(9, sourceStrgArray, [], {}));
    console.log("dedupe an array of strings and return index of string");
    var colorMapper2 = function (val, uniqueColors) {
        return uniqueColors.indexOf(val);
    };
    var mapPipe45 = new MapPipe(function (curelement) { return curelement; }, pipe44Reducer, colorMapper2);
    console.log(mapPipe45.pump("red", sourceStrgArray, [], {}));
    assert.equal(mapPipe45.pump("red", sourceStrgArray, [], {}), 0);
    console.log(mapPipe45.pump("white", sourceStrgArray, [], {}));
    assert.equal(mapPipe45.pump("white", sourceStrgArray, [], {}), 8);
    console.log("dedupe an array of strings and return an object containing the index and the search string");
    ;
    var colorMapper3 = function (val, uniqueColors) {
        return { pos: uniqueColors.indexOf(val), name: uniqueColors[uniqueColors.indexOf(val)] };
    };
    var mapPipe46 = new MapPipe(function (curelement) { return curelement; }, pipe44Reducer, colorMapper3);
    console.log(mapPipe46.pump("red", sourceStrgArray, [], {}));
    console.log(mapPipe46.pump("indigo", sourceStrgArray, [], {}));
    console.log(mapPipe46.pump("orange", sourceStrgArray, [], {}));
    console.log(mapPipe46.pump("lorange", sourceStrgArray, [], {}));
    console.log("dedupe an array of objects containing color strings and return an object containing the index and the search string");
    var pipe45Reducer = function (acc) { return function (prv, curelement) {
        var tempstrg = acc(curelement);
        if (prv.indexOf(tempstrg) === -1) {
            prv.push(tempstrg);
        }
        return (prv);
    }; };
    var mapPipe47 = new MapPipe(function (curelement) { return curelement.color; }, pipe45Reducer, colorMapper3);
    console.log("one shot");
    console.log(mapPipe47.pump("red", sourceStrgArrayOfObj, [], {}));
    console.log(mapPipe47.pump("indigo", sourceStrgArrayOfObj, [], {}));
    console.log(mapPipe47.pump("orange", sourceStrgArrayOfObj, [], {}));
    console.log(mapPipe47.pump("lorange", sourceStrgArrayOfObj, [], {}));
    console.log("curried");
    var t47 = mapPipe47.pumpC(sourceStrgArrayOfObj, [], {});
    console.log(t47("red"));
    console.log(t47("indigo"));
    console.log(t47("orange"));
    console.log(t47("lorange"));
    console.log("create trailing avg over array into new array and get element at position");
    var sourceArrTrlAvg = [0, 3, 5, 7, 8, 9, 12, 234, 45, 2, 2, 6, 7, 2, 226, 423, 786, 67, 4543, 2, 226, 54, 57, 69, 34, 0, 56, 12, 978];
    var avgOverNEleToLeft = 6;
    var pipeTrailingAvgReducer = function (acc) { return function (prv, curelement, idx, theAr) {
        var tempval = 0;
        var counter = 0;
        if (avgOverNEleToLeft < 1) {
            console.log("avgOverNEleToLeft  must not be < 1");
            avgOverNEleToLeft = 1;
        }
        for (var i = 0; i < avgOverNEleToLeft; i++) {
            if ((idx - i) >= 0 && (idx - i) < theAr.length) {
                tempval += acc(theAr[idx - i]);
                counter++;
            }
            else {
                break;
            }
        }
        if (counter !== 0) {
            tempval /= counter;
        }
        prv.push(tempval);
        return (prv);
    }; };
    var trailingAvgMapper = function (val, trailingAvgs) {
        return trailingAvgs[val];
    };
    var mapPipeTrailingAvg = new MapPipe(function (curelement) { return curelement; }, pipeTrailingAvgReducer, trailingAvgMapper);
    var theOutputArray = [];
    console.log(mapPipeTrailingAvg.pump(4, sourceArrTrlAvg, theOutputArray, null));
    var theSecondOutputArray = [];
    console.log(mapPipeTrailingAvg.pump(4, theOutputArray, theSecondOutputArray, null));
    console.log(theOutputArray);
    console.log(sourceArrTrlAvg);
    console.log(theSecondOutputArray);
    console.log("map a value from within a data source range into a css color string creating a 3 channel #rrggbb string");
    var valueToCssColorMapper = function (val, minMaxOfInterval, destLeftRight) {
        var targetColorValue = [];
        if (destLeftRight.length !== 3) {
            throw "must pass 3 left right pairs in the destLeftRight array";
        }
        destLeftRight.forEach(function (leftrightPair) {
            var intervalSrc = minMaxOfInterval.max - minMaxOfInterval.min;
            var intervaldest = leftrightPair.right - leftrightPair.left;
            var fraction = (val - minMaxOfInterval.min) / intervalSrc;
            targetColorValue.push(leftrightPair.left + (fraction * intervaldest));
        });
        var colstrg = "#" + zeroPadX(limitto8Bit(targetColorValue[0]), 2)
            + zeroPadX(limitto8Bit(targetColorValue[1]), 2)
            + zeroPadX(limitto8Bit(targetColorValue[2]), 2);
        return colstrg;
    };
    var mapNumberToCssColorString = new MapPipe(function (curelement) { return curelement; }, getExtremaFromNumberArrayReducer, valueToCssColorMapper);
    console.log(mapNumberToCssColorString.pump(-2543, sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumberToCssColorString.pump(0, sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumberToCssColorString.pump(4, sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumberToCssColorString.pump(100, sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumberToCssColorString.pump(400, sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumberToCssColorString.pump(2004, sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumberToCssColorString.pump(4543, sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumberToCssColorString.pump(14543, sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumberToCssColorString.pump(24543, sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log("...and the same in curried...");
    var closuremapNumberToCssColorString = mapNumberToCssColorString.pumpC(sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]);
    console.log(closuremapNumberToCssColorString(-2543));
    console.log(closuremapNumberToCssColorString(0));
    console.log(closuremapNumberToCssColorString(4));
    console.log(closuremapNumberToCssColorString(100));
    console.log(closuremapNumberToCssColorString(400));
    console.log(closuremapNumberToCssColorString(2004));
    console.log(closuremapNumberToCssColorString(4543));
    console.log(closuremapNumberToCssColorString(14543));
    console.log(closuremapNumberToCssColorString(24543));
    console.log("map a an array of numbers from within a data source range into an array of css color strings creating a 3 channel #rrggbb string");
    var valuesToCssColorsMapper = function (values, minMaxOfInterval, destLeftRight) {
        var returntrings = [];
        if (destLeftRight.length !== 3) {
            throw "must pass 3 left right pairs in the destLeftRight array";
        }
        values.forEach(function (val) {
            var targetColorValue = [];
            destLeftRight.forEach(function (leftrightPair) {
                var intervalSrc = minMaxOfInterval.max - minMaxOfInterval.min;
                var intervaldest = leftrightPair.right - leftrightPair.left;
                var fraction = (val - minMaxOfInterval.min) / intervalSrc;
                targetColorValue.push(leftrightPair.left + (fraction * intervaldest));
            });
            var colstrg = "#" + zeroPadX(limitto8Bit(targetColorValue[0]), 2)
                + zeroPadX(limitto8Bit(targetColorValue[1]), 2)
                + zeroPadX(limitto8Bit(targetColorValue[2]), 2);
            returntrings.push(colstrg);
        });
        return returntrings;
    };
    var mapNumbersToCssColorStrings = new MapPipe(function (curelement) { return curelement; }, getExtremaFromNumberArrayReducer, valuesToCssColorsMapper);
    console.log(mapNumbersToCssColorStrings.pump([-2543], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumbersToCssColorStrings.pump([0], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumbersToCssColorStrings.pump([4], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumbersToCssColorStrings.pump([100], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumbersToCssColorStrings.pump([400], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumbersToCssColorStrings.pump([2004], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumbersToCssColorStrings.pump([4543], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumbersToCssColorStrings.pump([14543], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumbersToCssColorStrings.pump([24543], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumbersToCssColorStrings.pump([1, 321, 43, 534, 75, 8, 0], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumbersToCssColorStrings.pump([1, 321, 43, 534, 75, 8, 4], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumbersToCssColorStrings.pump([1, 321, 43, 534, 75, 8, 100], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumbersToCssColorStrings.pump([1, 321, 43, 534, 75, 8, 400], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumbersToCssColorStrings.pump([1, 321, 43, 534, 75, 8, 2004], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumbersToCssColorStrings.pump([1, 321, 43, 534, 75, 8, 4543], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumbersToCssColorStrings.pump([1, 321, 43, 534, 75, 8, 14543], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log(mapNumbersToCssColorStrings.pump([1, 321, 43, 534, 75, 8, 24543], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
    console.log("...and the same in curried...");
    var tempPusher = mapNumbersToCssColorStrings.pumpC(sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]);
    console.log(tempPusher([1, 321, 43, 534, 75, 8, 0]));
    console.log(tempPusher([1, 321, 43, 534, 75, 8, 4]));
    console.log(tempPusher([1, 321, 43, 534, 75, 8, 100]));
    console.log(tempPusher([1, 321, 43, 534, 75, 8, 400]));
    console.log(tempPusher([1, 321, 43, 534, 75, 8, 2004]));
    console.log(tempPusher([1, 321, 43, 534, 75, 8, 4543]));
    console.log(tempPusher([1, 321, 43, 534, 75, 8, 14543]));
    console.log(tempPusher([1, 321, 43, 534, 75, 8, 24543]));
    console.log(tempPusher([0]));
    console.log(tempPusher([4]));
    console.log(tempPusher([100]));
    console.log(tempPusher([400]));
    console.log(tempPusher([2004]));
    console.log(tempPusher([4543]));
    console.log(tempPusher([14543]));
    console.log(tempPusher([24543]));
    readlineSync.question("hit enter to exit :");
})(MapPipeline || (MapPipeline = {}));
