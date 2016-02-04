module t443 {


  interface FunctionConstructor{
  //  ():any;
    where(any): Function;

  };

(<any>Function.prototype).where
  =  (function () {
  var fn = this, tests = [].slice.apply(arguments);
  (tests || []).forEach(function (test) {
    if (fn.call(this, test[0]) !== test[1]) {
      throw new Error(fn.name+' Failed inline unit test with args: called with ' + test[0] + " it should return " + test[1]);
    }
    else{
      console.log("pass");
    }
  });
  return fn;
});

  function mysquare (n) {
    return n * n;
  };


//
//   mysquare.where(
//   [[2], 4], // [[arrayOfArguments], expectedResult]
//   [[3], 9]  // <-- This test will throw an error
//   );
//
 }
