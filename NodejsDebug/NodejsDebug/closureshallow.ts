module t1a {

  var num = 43;
  var comp = { a: 42, b: 43 };

//  setTimeout
  (() => {
    //comp={a:42,b:43};
    //comp.a = 42;
    //comp.b = 43;
    // even though the closure can access the var comp after the outer scope has gone, 
    //it can only access the state of comp at the time when the lambda was called
    console.log(comp);
    console.log(comp.a);
    console.log(comp.b);
    console.log(num);

    var myfunc = () => {
      console.log(comp);
      console.log(num);
      return comp.a + comp.b;
    };
    console.log(myfunc());

    console.log("end");

  })();


    //, 1000);

  num = 45;
  comp = { a: 142, b: 143 };




  (() => {
    //comp={a:42,b:43};
    //comp.a = 42;
    //comp.b = 43;
    // even though the closure can access the var comp after the outer scope has gone, 
    //it can only access the state of comp at the time when the lambda was called
    console.log(comp);
    console.log(comp.a);
    console.log(comp.b);
    console.log(num);

    var myfunc = () => {
      console.log(comp);
      console.log(num);
      return comp.a + comp.b;
    };
    console.log(myfunc());

    console.log("end");

  })();
  
}