module ns65 {// Example : reverse inference , structural typing
  var t1 = { dx: 122, dz: 34534, dy: 088 }; // this works

  console.log(typeof t1);// => type object
  console.log(t1);//  at run time js knows the type, of course, ts knows it at design time: push f1

  t1 = { dz: 34534, dy: 088, dx: 12 }; // this doesnt work


  var v3: IDvec = t1;





  interface IDvec {
    dx: number;
    dy: number;
    dz: number;
  }


  t1 = v3;// structure matches so its fine




  console.log('end');
}