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
t1= { };// this doesnt work

