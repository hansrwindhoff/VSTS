module M1 {


  export interface I1 {
    value: number;
    hellostring: string;
  }

  export interface I1 {
    name: string;
    num: number;
  }

  export interface I2 extends I1 {
    address: string;
  }


 // var v1: M1.I2 = <any>{};
  var v1 = <M1.I2>{};

  v1.address = "1500 cherokee";
  v1.num = 5;
  v1.hellostring = "hello galvanize";

  console.log('end');


}


