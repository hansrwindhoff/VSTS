module M1{


export interface I1{
  value: number;
  hellostring:string;
}	

  export interface I1{
  name: string;
  num:number;
}

export interface I2 extends I1
{
	address:string;
}



v1.address = "sdklmklmsdklfm";
  v1.num = 5;
  v1.hellostring = "helloworld";

console.log('end');


}

var v1: M1.I2;
v1.prototype.var3 = 9;