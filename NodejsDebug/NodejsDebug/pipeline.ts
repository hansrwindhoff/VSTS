/// <reference path="Scripts/typings/node/node.d.ts" />

module Piping {


  var readlineSync = require('readline-sync');

  interface IAccessorFnctn<TIn, TVal> {
    (ele: TIn): TVal;
  }

  //interface IreducerFnctn<TIn ,TVal, TReducerRes> {
  //  (valueAccessore: IAccessorFnctn<TIn, TVal>): (prv: TReducerRes, curelement: TIn, idx: number, theAr: TIn[]) => TReducerRes;
  //}

  interface IReducerFnctn<TIn, TVal, TReducerRes> {
    (prv: TReducerRes, curelement: TIn, idx: number, theAr: TIn[]): TReducerRes;
  }

  interface IAccRed<TIn, TVal, TReducerRes> {
    (valueAccessor: IAccessorFnctn<TIn, TVal>): IReducerFnctn<TIn, TVal, TReducerRes>;
  }
  interface IAccRedNew<TIn, TVal, TReducerRes> {
    (valueAccessor: IAccessorFnctn<TIn, TVal>): IReducerFnctn<TIn, TVal, TReducerRes>;
  }

  interface IMapperFnctn<TVal, TReducerRes, TOut> {
    (val: TVal, reducerRes: TReducerRes): TOut;
  }

  interface IPipeFnctn<TIn, TVal, TReducerRes, TOut> {
    (curVal: TIn, theArr: TIn[]): TOut
  };


  interface IMapPipe<TIn, TVal,  TReducerRes, TOut> {
    accessorfnc(a: TIn): TVal;
    reducerfnc(a: TIn, b: TVal): TReducerRes;
    mapperfnc (a:TVal, b:TReducerRes): TOut;
  }


  //var mapPipeObj = <IMapPipe<number, number, { min: number; max: number }, number>> {};
  //mapPipeObj.accessorfnc = (a: number) => { return a; }
  //mapPipeObj.reducerfnc = (a:number, b:number) => {
    
  //}







  //class mapPipe<TIn, TVal, TReducerRes, TOut> {
  //  accessorfnc: IAccessorFnctn<TIn, TVal>;
  //  reducerfnc: IAccRed<TIn, TVal, TReducerRes>;
  //  mapperfnc: IMapperFnctn<TVal, TReducerRes, TOut>;
  //  constructor(
  //    accessorfnc: IAccessorFnctn<TIn, TVal>,
  //    reducerfnc: IAccRed<TIn, TVal, TReducerRes>,
  //    mapperfnc: IMapperFnctn<TVal, TReducerRes, TOut>) {
  //    this.accessorfnc = accessorfnc;
  //    this.reducerfnc = reducerfnc;
  //    this.mapperfnc = mapperfnc;
  //  }

  //  pump = (curVal: TVal, theArr: TIn[]) => {
  //    return this.mapperfnc(curVal, theArr.reduce(this.reducerfnc(this.accessorfnc), <TReducerRes>{}));
  //  };
  //}

  



  class MapPipe<TIn, TVal, TReducerRes, TOut> {
    accessorfnc: IAccessorFnctn<TIn, TVal>;
    reducerfnc: IAccRed<TIn, TVal, TReducerRes>;
    mapperfnc: IMapperFnctn<TVal, TReducerRes, TOut>;
    constructor(
      accessorfnc: IAccessorFnctn<TIn, TVal>,
      reducerfnc: IAccRed<TIn, TVal, TReducerRes>,
      mapperfnc: IMapperFnctn<TVal, TReducerRes, TOut>) {
      this.accessorfnc = accessorfnc;
      this.reducerfnc = reducerfnc;
      this.mapperfnc = mapperfnc;
    }

    pump = (curVal: TVal, theArr: TIn[]) => {
      return this.mapperfnc(curVal, theArr.reduce(this.reducerfnc(this.accessorfnc), <TReducerRes>{}));
    };
  }


  //function getExt0<TSource>() {
    
  //}


  interface IGetExtension<TSourceEle , TVal, TReducerRes> {
    (): IAccRedNew<TSourceEle, TVal, TReducerRes> 
  }


  var getExt0: IAccRed<number, number, { min: number; max: number }> =
     (acc)=> {
      return (prv, curelement, idx, theAr) => {

        var valtempval = acc(curelement);
        if (prv.max === undefined) prv.max = -99999999;
        if (prv.min === undefined) prv.min = 99999999;
        prv.max = (prv.max < valtempval ? valtempval : prv.max);
        prv.min = (prv.min > valtempval ? valtempval : prv.min);
        return prv;
      }
    }



  var numberAccessor = (curelement: Number) => curelement;
  var c42 = new MapPipe<Number, Number, { min: number; max: number }, number>(
    numberAccessor,
    getExt0,
    mapValue
    );
  console.log(c1.pump(6, [0, 3, 5, 7, 8, 9, 12]));




  var getExt: IAccRed<number, number, { min: number; max: number }> =
    (acc) => {
      return (prv, curelement, idx, theAr) => {

        var valtempval = acc(curelement);
        if (prv.max === undefined) prv.max = -99999999;
        if (prv.min === undefined) prv.min = 99999999;
        prv.max = (prv.max < valtempval ? valtempval : prv.max);
        prv.min = (prv.min > valtempval ? valtempval : prv.min);
        return prv;
      }
    }




  var getExt2: IAccRed<{ value: number }, number, { min: number; max: number }> =
    (acc) => {
      return (prv, curelement, idx, theAr) => {

        var valtempval = acc(curelement);
        if (prv.max === undefined) prv.max = -99999999;
        if (prv.min === undefined) prv.min = 99999999;
        prv.max = (prv.max < valtempval ? valtempval : prv.max);
        prv.min = (prv.min > valtempval ? valtempval : prv.min);
        return prv;
      }
    }

  var mapValue: IMapperFnctn<number, { min: number; max: number }, number> = (val, reducerRes) => {
    var interval = reducerRes.max - reducerRes.min;
    var fraction = (val - reducerRes.min) / interval;
    return fraction;
  }

  



  var numberAccessor = (curelement: Number) => curelement;
  var c1 = new MapPipe<Number, Number, { min: number; max: number }, number>(
    numberAccessor,
    getExt,
    mapValue
    );
  console.log(c1.pump(6, [0, 3, 5, 7, 8, 9, 12]));





  interface ISourceTypeArrOfObj{
    value:number;
  }

  var numberInObjAccessor = (curelement: ISourceTypeArrOfObj) => curelement.value;
  var c2 = new MapPipe<ISourceTypeArrOfObj, number, { min: number; max: number }, number>(
    numberInObjAccessor,
    getExt2,
    mapValue
    );
  console.log(c2.pump(6, [{value: 4}, { value: 3 }, { value: 5 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 12 }]));




  readlineSync.question('hit enter to exit? :');







}


//  var myArr2= [{value:1},{value:3},{value:5},{value:7},{value:8},{value:9},{value:12}];


//  var fnPipe2:IPipeFnctn<{value:number} , number, {min:number;max:number}, number> 
//    = (curVal, theArr)=>{

//      var accessorfnc = (curelement) => curelement;
//      var reducerfnc = (prv, curelement, idx, theAr) => {
//        var valtempval = accessorfnc(curelement);

//        if (prv.max === undefined) prv.max = -99999999;
//        if (prv.min === undefined) prv.min = 99999999;

//        prv.max = (prv.max < valtempval ? valtempval : prv.max);
//        prv.min = (prv.min > valtempval ? valtempval : prv.min);
//        return prv
//      };
//      var mapperfnc = (val, reducerRes) => {
//        var interval = reducerRes.max - reducerRes.min;
//        var fraction = (val - reducerRes.min) / interval;
//        return fraction;
//      }


//      return mapperfnc(curVal, theArr.reduce(reducerfnc, {}));

//  };

// }




//  {
// accessorfnc: IAccessorFnctn<TIn , TVal>;
// reducerfnc: IreducerFnctn<TIn , TVal,TReducerRes>;
// mapperfnc: IMapperFnctn< TVal,TReducerRes, TOut> ; 
//  }
;
//  }


//var myArr = [0, 3, 5, 7, 8, 9, 12];


//var fnPipe: IPipeFnctn<number, number, { min: number;max: number }, number> = (curVal, theArr) => {

//  var accessorfnc = (curelement) => curelement;
//  var reducerfnc = (prv, curelement, idx, theAr) => {
//    var valtempval = accessorfnc(curelement);

//    if (prv.max === undefined) prv.max = -99999999;
//    if (prv.min === undefined) prv.min = 99999999;

//    prv.max = (prv.max < valtempval ? valtempval : prv.max);
//    prv.min = (prv.min > valtempval ? valtempval : prv.min);
//    return prv
//  };
//  var mapperfnc = (val, reducerRes) => {
//    var interval = reducerRes.max - reducerRes.min;
//    var fraction = (val - reducerRes.min) / interval;
//    return fraction;
//  }


//  return mapperfnc(curVal, theArr.reduce(reducerfnc, {}));


//};
//console.log(fnPipe(6, myArr));

