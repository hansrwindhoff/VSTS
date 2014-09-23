module t1 {

  var num = 43;
  var comp = { a: 42, b: 43 };

  setTimeout(function () {
    //		comp={a:42,b:43};
    comp.a = 42;
    comp.b = 43;
    console.log(comp);

    var myfunc = function () {
      console.log(comp);
      return comp.a + comp.b;
    };
    console.log(myfunc());
    
  }, 1000);

  num = 45;
  comp = { a: 142, b: 143 };


}