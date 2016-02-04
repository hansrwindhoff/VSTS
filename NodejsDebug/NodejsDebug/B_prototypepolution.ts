class c1 {
  value: number;
  constructor(public id1 = 1) {
    // code...
    this.value = 42;
  }

}



class c2 extends c1 {

  id1: number;

  constructor(public id2 = 0) {

    super();
    // code...
    //	super.x1 = 3;
  }


}


var x = new c2(5);
console.log(x);
console.log(x.id1);


console.log(x.hasOwnProperty("id1") );
console.log(x.hasOwnProperty("id2") );
