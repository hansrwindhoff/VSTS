module m5 {

  function f1 (){

  };
  f1.prototype.owner = "hans";
  console.log(f1.prototype.owner);


  f1.__proto__.owner2 = "heike";
  console.log(f1.owner2);

  var f2 =new Object;
  f2.__proto__.owner2 = "heike";
  console.log(f2.owner2);


  var f3 = new Object();
  console.log(f3.owner2);


  // check these in watch window
  var f4 = [];
  var f5 = new Date();
  var f6 = new Date;


  console.log("end");
}