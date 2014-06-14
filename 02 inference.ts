module T1{
// // more complex inference
 var t1 = { dx: 45, dy: 34, dz: 12 };


// // lets say we define is as intrface and dont rely on inference
interface Idvec {
  dx: number;
  dy: number;
  dz: number;
}


// var t1:Idvec;
//
t1= {dx:34, dy:0,dz:4,dt:98 };// this doesnt work

  console.log('end');
}