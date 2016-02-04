module t1b {

  var complex = { a: 42, b: 43 };
  var fn1 = () => {
    complex.a++;
    console.log(complex.a);
  };
  fn1();
  fn1();
  fn1();
  fn1();
  fn1();




  var simple = 42;
  var fn2 = () => {
    simple++;
    console.log(simple);
  };
  fn2();
  fn2();
  fn2();
  fn2();
  fn2();
}