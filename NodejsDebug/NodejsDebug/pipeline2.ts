/// <reference path="Scripts/typings/node/node.d.ts" />
import assert = require("assert");



module MapPipeline {

  var readlineSync = require("readline-sync");



  interface IAccessorFnctn<TIn, TVal> {
    (elements: TIn): TVal;
  }

  interface IReducerFnctn<TIn, TVal, TReducerRes> {
    (acc: IAccessorFnctn<TIn, TVal>): (prv: TReducerRes, curelement: TIn, idx: number, theAr: TIn[]) => TReducerRes;
  }

  interface IMapperFnctn<TVal, TReducerRes, TTargetRange, TOut> {
    (val: TVal, sourceInterval: TReducerRes, destInterval: TTargetRange): TOut;
  }

  class MapPipe<TValToMap, TInputData, TVal, TReducerRes, TTargetRange, TOut> {
    private _accessor: IAccessorFnctn<TInputData, TVal>;
    private _reducerfnc: IReducerFnctn<TInputData, TVal, TReducerRes>;
    private _mapperfnc: IMapperFnctn<TValToMap, TReducerRes, TTargetRange, TOut>;

    constructor(
      accessor: IAccessorFnctn<TInputData, TVal>,
      reducerfnc: IReducerFnctn<TInputData, TVal, TReducerRes>,
      mapperfnc: IMapperFnctn<TValToMap, TReducerRes, TTargetRange, TOut>) {

      this._accessor = accessor;
      this._reducerfnc = reducerfnc;
      this._mapperfnc = mapperfnc;

    }

    // one shot  pump
    pump(curVal: TValToMap, theArr: TInputData[], seedReducer: TReducerRes, targetRange: TTargetRange) {
      return this._mapperfnc(curVal, <TReducerRes> theArr.reduce(this._reducerfnc(this._accessor), seedReducer), targetRange);
    } 
    
    // a curried pump
    // this allows you to setup your mapping parameters in a call to pumpC and then use the returned closure to map values using the setup.
    pumpC(theArr: TInputData[], seedReducer: TReducerRes, targetRange: TTargetRange) {
      var tempReducerResult =<TReducerRes> theArr.reduce(this._reducerfnc(this._accessor), seedReducer);
      return (curVal: TValToMap) => {
        return this._mapperfnc(curVal, tempReducerResult  , targetRange);  
      }
    }
  }

  // utils
  var zeroPadX = (num: number, size: number): string => {
    var s = "000000000" + num.toString(16);
    return s.substr(s.length - size);
  };
  var limitto8Bit = (val: number) => {
    val = parseInt(val.toString());
    return (Math.max(Math.min(val, 255), 0));
  };




  /// test usages
  interface IReducerResMaxMin {
    min: number;
    max: number;
  };

  var linearMapper: IMapperFnctn<number, IReducerResMaxMin, IMapperTargetRangeLeftRight, number> =
    (val, minMaxOfInterval, destLeftRight) => {
      var intervalSrc = minMaxOfInterval.max - minMaxOfInterval.min;
      var intervaldest = destLeftRight.right - destLeftRight.left;
      var fraction = (val - minMaxOfInterval.min) / intervalSrc;
      return destLeftRight.left + (fraction * intervaldest);
    }


  var getExtrema = (curVal: number, theExtrema: IReducerResMaxMin) => {
    theExtrema.max = (theExtrema.max < curVal ? curVal : theExtrema.max);
    theExtrema.min = (theExtrema.min > curVal ? curVal : theExtrema.min);
    return theExtrema;
  };


  ///////////////////////////////////////////////////////////////////////////////////////

  interface IMapperTargetRangeLeftRight {
    left: number;
    right: number;
  };



  var getExtremaFromNumberArrayReducer: IReducerFnctn<number, number, IReducerResMaxMin> = acc => (prv, curelement) => {
    var valtempval = acc(curelement);
    return getExtrema(valtempval, prv);
  };


  var mapPipe42 = new MapPipe<number, number, number, IReducerResMaxMin, IMapperTargetRangeLeftRight, number>(
    curelement => curelement,
    getExtremaFromNumberArrayReducer,
    linearMapper
    );
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

  //readlineSync.question('hit enter to continue :');


  


  ///////////////////////////////////////////////////////////////////////////////////////
  var pipe43Reducer: IReducerFnctn<{ value: number }, number, IReducerResMaxMin> = acc => (prv, curelement) => {
    var valtempval = acc(curelement);
    return getExtrema(valtempval, prv);
  }

  var mapPipe43 = new MapPipe<number, { value: number }, number, IReducerResMaxMin, IMapperTargetRangeLeftRight, number>(
    curelement => curelement.value,
    pipe43Reducer,
    linearMapper
    );
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



  var pipe44Reducer: IReducerFnctn<string, string, string[]> = acc => (prv, curelement/*, idx, theAr*/) => {
    var tempstrg = acc(curelement);
    if (prv.indexOf(tempstrg) === -1) {
      prv.push(tempstrg);
    }
    return (prv);
  }

  console.log("dedupe an array of strings and return element at position");
  var colorMapper: IMapperFnctn<number, string[], {}, string> =
    (val, uniqueColors/*, unused*/) => {
      var color = "nocolor";

      if (val < uniqueColors.length && val > -1) {
        color = uniqueColors[val];
      }
      return color;
    }
  var mapPipe44 = new MapPipe<number, string, string, string[], {}, string>(
    curelement => curelement,
    pipe44Reducer,
    colorMapper
    );

  console.log(mapPipe44.pump(0, sourceStrgArray, [], {}));
  console.log(mapPipe44.pump(5, sourceStrgArray, [], {}));
  console.log(mapPipe44.pump(8, sourceStrgArray, [], {}));
  console.log(mapPipe44.pump(9, sourceStrgArray, [], {}));


  console.log("dedupe an array of strings and return index of string");
  var colorMapper2: IMapperFnctn<string, string[], {}, number> =
    (val, uniqueColors/*, unused*/) => {
      return uniqueColors.indexOf(val);
    }
  var mapPipe45 = new MapPipe<string, string, string, string[], {}, number>(
    curelement => curelement,
    pipe44Reducer,
    colorMapper2
    );



  console.log(mapPipe45.pump("red", sourceStrgArray, [], {}));
  assert.equal(mapPipe45.pump("red", sourceStrgArray, [], {}), 0);

  console.log(mapPipe45.pump("white", sourceStrgArray, [], {}));
  assert.equal(mapPipe45.pump("white", sourceStrgArray, [], {}), 8);




  console.log("dedupe an array of strings and return an object containing the index and the search string");
  interface INameAndPosOfColor { pos: number; name: string };
  var colorMapper3: IMapperFnctn<string, string[], {}, INameAndPosOfColor> =
    (val, uniqueColors) => {
      return { pos: uniqueColors.indexOf(val), name: uniqueColors[uniqueColors.indexOf(val)] };
    }
  var mapPipe46 = new MapPipe<string, string, string, string[], {}, INameAndPosOfColor>(
    curelement => curelement,
    pipe44Reducer,
    colorMapper3
    );



  console.log(mapPipe46.pump("red", sourceStrgArray, [], {}));
  console.log(mapPipe46.pump("indigo", sourceStrgArray, [], {}));
  console.log(mapPipe46.pump("orange", sourceStrgArray, [], {}));
  console.log(mapPipe46.pump("lorange", sourceStrgArray, [], {}));


  console.log("dedupe an array of objects containing color strings and return an object containing the index and the search string");
  var pipe45Reducer: IReducerFnctn<{ color: string }, string, string[]> = acc => (prv, curelement/*, idx, theAr*/) => {
    var tempstrg = acc(curelement);
    if (prv.indexOf(tempstrg) === -1) {
      prv.push(tempstrg);
    }
    return (prv);
  }

  var mapPipe47 = new MapPipe<string, { color: string }, string, string[], {}, INameAndPosOfColor>(
    curelement => curelement.color,
    pipe45Reducer,
    colorMapper3
    );


  console.log("one shot");
  console.log(mapPipe47.pump("red", sourceStrgArrayOfObj, [], {}));
  console.log(mapPipe47.pump("indigo", sourceStrgArrayOfObj, [], {}));
  console.log(mapPipe47.pump("orange", sourceStrgArrayOfObj, [], {}));
  console.log(mapPipe47.pump("lorange", sourceStrgArrayOfObj, [], {}));


  console.log("curried");
  var t47 = mapPipe47.pumpC(sourceStrgArrayOfObj, [], {});
  console.log(t47("red"     ));
  console.log(t47("indigo"  ));
  console.log(t47("orange"  ));
  console.log(t47("lorange" ));
  



  console.log("create trailing avg over array into new array and get element at position");
  var sourceArrTrlAvg = [0, 3, 5, 7, 8, 9, 12, 234, 45, 2, 2, 6, 7, 2, 226, 423, 786, 67, 4543, 2, 226, 54, 57, 69, 34, 0, 56, 12, 978];
  var avgOverNEleToLeft = 6;

  var pipeTrailingAvgReducer: IReducerFnctn<number, number, number[]> = acc => (prv, curelement, idx, theAr) => {
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
      } else {
        break;
      }
    }
    if (counter !== 0) {
      tempval /= counter;
    }
    prv.push(tempval);
    return (prv);
  }


  var trailingAvgMapper: IMapperFnctn<number, number[], void, number> =
    (val, trailingAvgs) => {
      return trailingAvgs[val];// trivial
    }

  var mapPipeTrailingAvg = new MapPipe<number, number, number, number[], void, number>(
    curelement => curelement,// trivial
    pipeTrailingAvgReducer,
    trailingAvgMapper
    );

  var theOutputArray = [];
  console.log(mapPipeTrailingAvg.pump(4, sourceArrTrlAvg, theOutputArray, null));
  var theSecondOutputArray = [];
  // feeding the result back into the mappipe
  console.log(mapPipeTrailingAvg.pump(4, theOutputArray, theSecondOutputArray, null));

  console.log(theOutputArray);
  console.log(sourceArrTrlAvg);
  console.log(theSecondOutputArray);





  console.log("map a value from within a data source range into a css color string creating a 3 channel #rrggbb string");
  interface ILeftRightPair {
    left: number;
    right: number;
  }

  var valueToCssColorMapper: IMapperFnctn<number, IReducerResMaxMin, ILeftRightPair[], string> =
    (val, minMaxOfInterval, destLeftRight) => {
      var targetColorValue = [];
      if (destLeftRight.length !== 3) {
        throw "must pass 3 left right pairs in the destLeftRight array";
      }
      destLeftRight.forEach((leftrightPair) => {
        var intervalSrc = minMaxOfInterval.max - minMaxOfInterval.min;
        var intervaldest = leftrightPair.right - leftrightPair.left;
        var fraction = (val - minMaxOfInterval.min) / intervalSrc;
        targetColorValue.push(leftrightPair.left + (fraction * intervaldest));
      });

      var colstrg = "#" + zeroPadX(limitto8Bit(targetColorValue[0]), 2)
        + zeroPadX(limitto8Bit(targetColorValue[1]), 2)
        + zeroPadX(limitto8Bit(targetColorValue[2]), 2);
      return colstrg;
    }

  var mapNumberToCssColorString = new MapPipe<number, number, number, IReducerResMaxMin, { left: number; right: number }[], string>(
    curelement => curelement,// trivial
    getExtremaFromNumberArrayReducer,
    valueToCssColorMapper
    );
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
  console.log(closuremapNumberToCssColorString(0    ));
  console.log(closuremapNumberToCssColorString(4    ));
  console.log(closuremapNumberToCssColorString(100  ));
  console.log(closuremapNumberToCssColorString(400  ));
  console.log(closuremapNumberToCssColorString(2004 ));
  console.log(closuremapNumberToCssColorString(4543 ));
  console.log(closuremapNumberToCssColorString(14543));
  console.log(closuremapNumberToCssColorString(24543));



  console.log("map a an array of numbers from within a data source range into an array of css color strings creating a 3 channel #rrggbb string");

  var valuesToCssColorsMapper: IMapperFnctn<number[], IReducerResMaxMin, ILeftRightPair[], string[]> =
    (values, minMaxOfInterval, destLeftRight) => {
      var returntrings: string[] = [];
      if (destLeftRight.length !== 3) {
        throw "must pass 3 left right pairs in the destLeftRight array";
      }

      values.forEach((val) => {
        var targetColorValue:number[] = [];
        destLeftRight.forEach((leftrightPair) => {
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
    }

  var mapNumbersToCssColorStrings = new MapPipe<number[], number, number, IReducerResMaxMin, { left: number; right: number }[], string[]>(
    curelement => curelement,// trivial
    getExtremaFromNumberArrayReducer,
    valuesToCssColorsMapper
    );


  console.log(mapNumbersToCssColorStrings.pump([-2543], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
  console.log(mapNumbersToCssColorStrings.pump([0], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
  console.log(mapNumbersToCssColorStrings.pump([4], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
  console.log(mapNumbersToCssColorStrings.pump([100], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
  console.log(mapNumbersToCssColorStrings.pump([400], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
  console.log(mapNumbersToCssColorStrings.pump([2004], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
  console.log(mapNumbersToCssColorStrings.pump([4543], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
  console.log(mapNumbersToCssColorStrings.pump([14543], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
  console.log(mapNumbersToCssColorStrings.pump([24543], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
  


  console.log(mapNumbersToCssColorStrings.pump([1,321,43,534,75,8,0], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
  console.log(mapNumbersToCssColorStrings.pump([1,321,43,534,75,8,4], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
  console.log(mapNumbersToCssColorStrings.pump([1,321,43,534,75,8,100], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
  console.log(mapNumbersToCssColorStrings.pump([1,321,43,534,75,8,400], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
  console.log(mapNumbersToCssColorStrings.pump([1,321,43,534,75,8,2004], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
  console.log(mapNumbersToCssColorStrings.pump([1,321,43,534,75,8,4543], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
  console.log(mapNumbersToCssColorStrings.pump([1,321,43,534,75,8,14543], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));
  console.log(mapNumbersToCssColorStrings.pump([1, 321, 43, 534, 75, 8, 24543], sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]));


  console.log("...and the same in curried...");
  var tempPusher = mapNumbersToCssColorStrings.pumpC(sourceArrTrlAvg, { min: Infinity, max: -Infinity }, [{ left: 0, right: 255 }, { left: 255, right: 0 }, { left: 124, right: 255 }]);
  console.log(tempPusher([1, 321, 43, 534, 75, 8, 0]    ));
  console.log(tempPusher([1, 321, 43, 534, 75, 8, 4]    ));
  console.log(tempPusher([1, 321, 43, 534, 75, 8, 100]  ));
  console.log(tempPusher([1, 321, 43, 534, 75, 8, 400]  ));
  console.log(tempPusher([1, 321, 43, 534, 75, 8, 2004] ));
  console.log(tempPusher([1, 321, 43, 534, 75, 8, 4543] ));
  console.log(tempPusher([1, 321, 43, 534, 75, 8, 14543]));
  console.log(tempPusher([1, 321, 43, 534, 75, 8, 24543]));

  console.log(tempPusher([ 0]));
  console.log(tempPusher([ 4]));
  console.log(tempPusher([ 100]));
  console.log(tempPusher([ 400]));
  console.log(tempPusher([ 2004]));
  console.log(tempPusher([ 4543]));
  console.log(tempPusher([ 14543]));
  console.log(tempPusher([ 24543]));

  readlineSync.question("hit enter to exit :");
}
