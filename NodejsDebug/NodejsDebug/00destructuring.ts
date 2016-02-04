module dest {
  "use strict"
  var getSomeObject = () => { return { a: 10, b: 20, c: 30 }; }
  var getSomeArray = () => { return [23, 34, 45]; }


  var { a, c, b} = getSomeObject();
  var [aa, cc, bb] = getSomeArray();

  console.log(a);
  console.log(b);
  console.log(c);
  console.log(aa);
  console.log(bb);
  console.log(cc);
}
