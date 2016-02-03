// es6
module ns {
  var num: number;
  export class Building {
    material: string;
    floors: number;
  }

  export class House extends Building {
    bedrooms: number;
  }

  var myHouse = new House();
  myHouse.bedrooms = 3;
  myHouse.floors = 1;
  myHouse.material = "brick";

}





var myhouse = new ns.House();
myhouse.bedrooms = 3;
myhouse.floors = 1;
myhouse.material = "brick";
console.log(myhouse);


console.log('end');
