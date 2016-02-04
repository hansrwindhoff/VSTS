
module Gennest {
  var readlineSync = require('readline-sync');

  interface ILevelZero<TR> {
    ():TR;
  }
  interface ILevelOne<TU,TR> {
    (input: TU[]): ILevelZero<TR>;
  }
  interface ILevelTwo<TV, TW> {
    (i1: TV, i2: TW): TW;
  }
  interface IADataType {
    value:number;
  }

  var f1: ILevelTwo<ILevelZero<number>, string>;
  f1 = (a, b) => {
    return b + (a()>0? " greater zero":" <= zero");
  }

  var theAccessor: ILevelOne<number,number>;
  theAccessor = (data) => {
    return () => data.reduce((prev,cur,idx,arr) => {
      return prev + cur;
    },0);
  };

  console.log(
    f1(
      theAccessor([1, 2, -3, 4, -5, -6]),
      "the sum over the array is")
    );

  var theAccessor2: ILevelOne<IADataType,number>;
  theAccessor2 = (data) => {
    return () => data.reduce((prev, cur, idx, arr) => {
      return prev + cur.value;
    }, 0);
  };

  console.log(
    f1(
      theAccessor2([{ value: 4 }, { value: 3 }, { value: 5 }, { value: 7 }, { value: -8 }, { value: -9 }, { value: -12 }]),
      "the sum over the values in the array is")
    );

  readlineSync.question('hit enter to exit? :');

}