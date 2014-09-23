module t1 {
  var readlineSync = require('readline-sync');


  var complex = { a: 42, b: 43 };
  var clo1 = (cpx) => {
    var cplinner = cpx;
    cplinner.a++;
    console.log(cplinner.a);
  };
  clo1(complex);
  clo1(complex);
  clo1(complex);
  clo1(complex);
  clo1(complex);




  var simple = 42;
  var clo2 = (smp)=> {
    smp++;
    console.log(smp);
  };
  clo2(simple);
  clo2(simple);
  clo2(simple);
  clo2(simple);
  clo2(simple);

  
  readlineSync.question('hit enter to exit? :');
  
}