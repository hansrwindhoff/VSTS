interface I1{
	value:number;
}	

interface I1{
	name:string;
}

interface I2 extends I1
{
	address:string;
}


var v1: I2;


console.log('end');


