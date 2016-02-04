// es6
module ns {
  var num: number;
  export class Building {
    material: string;
    floors: number;
  }

  export class House1 extends Building {
    bedrooms: number;
  }

	//
  // export class House1  {
  //   bedrooms: number;
  //   material: string;
  //   floors: number;
  // }


  var myHouse = new House1();
  myHouse.bedrooms = 3;
  myHouse.floors = 1;
  myHouse.material = "brick";

}





var myhouse = new ns.House1();
myhouse.bedrooms = 3;
myhouse.floors = 1;
myhouse.material = "brick";
console.log(myhouse);


console.log('end');
