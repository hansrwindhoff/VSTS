var u = { a: [2, 3, -24], b: [2, 3, 4], c: [2, 3, 4] };
var v = { a: [2, 3, 4], b: [2, 3, 4] };
var w = { a: [2, 3, 4] };


u=<any>w;
console.log(u);

u=<{a: number[];b: number[];c: number[]}>w;   // using an anonymous type
console.log(u);


// interface ImybaseObj {
//   a: number[];
// }
// //and one that derives from the base
// interface ImyextendedObj extends ImybaseObj {
//   b: number[];
// }



// var u:ImyextendedObj	={a:[2,3,4], b:[2,3,4] , c:[2,3,4] };
// var v:ImyextendedObj	={a:[2,3,4], b:[2,3,4] };
// var w:ImybaseObj	    ={a:[2,3,4]};



// w=u;
// u = <ImyextendedObj> w;

console.log('end');