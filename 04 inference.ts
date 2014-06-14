// Example : inference with generics
// lets define some interfaces
//... a base interface
interface ImybaseObj {
  a: number[];
}
//... and one that derives from the base
interface ImyextendedObj extends ImybaseObj {
  b: number[];
}

// interface ItestedCondition{
//   label:string; 
//   condition:boolean
// }

//and one that derives from the first derived 
interface I2ndmyextendedObj extends ImyextendedObj  {
  sumOverAGreaterZero:boolean;
  //testedCondition: ItestedCondition;
}


// interfaces can be apended anywhere
// interface ImyextendedObj extends ImybaseObj {
//   c: number[];
// }



// now we define two function interfaces for  functions
// that will consume the above interfaces , but only these 
// or possibly other interfaces that are at least derived from the base, a constraint
// a function that takes an input parameter of type T and
// a call back that itselft takes the same T and returns a bool
// the function return a T 
interface Ifct2<T extends ImybaseObj> {
  (inputPara: T, cb: (d: T) => boolean): T;
}


// here the function takes two possibly different types, the second one is returned
interface Ifct3<T extends ImybaseObj, U extends ImybaseObj> {
  (inputPara: T, cb: (d: T) => boolean): U;
  //(inputPara: T, cb: (d: T) => ItestedCondition): U;
  
}


// now some objects that implement the above interfaces
// we can do this (explictely setting the interface)

// var u:ImyextendedObj	={a:[2,3,4], b:[2,3,4] , c:[2,3,4] };
// var v:ImyextendedObj	={a:[2,3,4], b:[2,3,4] };
// var w:ImybaseObj	={a:[2,3,4]};

// or this way (implicitely typed) , infered
var u = { a: [2, 3, -24], b: [2, 3, 4], c: [2, 3, 4] };
var v = { a: [2, 3, 4], b: [2, 3, 4] };
var w = { a: [2, 3, 4] };
// console.log("u is a "+ typeof u);
// console.log(u);

// and a function that implements Ifct3 
// so here we type the var t3
var t3: Ifct3<ImyextendedObj, I2ndmyextendedObj>; //ts knows that the type parameters are constraint 
                                                  //to the base type interface, 
// var t3: Ifct3<number[], I2ndmyextendedObj>; // try this 

// and because it is typed already ts knows that the function that is being assigned to t3
// has the above types
//t3 = function (d, cb) {
//  var ret: I2ndmyextendedObj = <any>d;// this is like casting in C
//  ret.sumOverAGreaterZero= cb(d);// push f1 on cb
//  //ret.testedCondition = cb(d);
//  return ret;
//};

//ts knows that v is constraint to the base type interface, 
//try putting it to w, that doesnt work,  because w is not of type ImyextendedObj
//try putting {d:[1,2,3,4]} which doesnt fullfill the type requirement
//but u works
var x =  t3(u, function (d) {// is the sum over the array a greater zero?
    var sumoverarry = 0;
    
    sumoverarry= d.a.reduce(function ( prv,cur,i, theAr) {// try changing a => c
     return prv+cur;
     });
    console.log(sumoverarry);
    var ret =  sumoverarry > 0 ? true : false;
    return ret;
    //return {label:"sumoverAGreaterZero", condition:ret};
    });

// now we are calling it
console.log(x);

 
// // another axample for an implementation and the need to refactor
// //var y = t3(w, function (d) {
// var y = t3(u, function (d) {
//  var ret;
//  //d.b[0] > 0 ? ret = true : null; //w has no b
//  ret = d.a[0] > 0 ? true : null; //this works
//  return ret;// ret is any here 
//  //return {label:"firstelementGreaterZero", condition:ret};
// });
// console.log(y); 

console.log('end');