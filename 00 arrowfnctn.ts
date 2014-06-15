
//lexically scoped  or dynamically scoped
// console.log(this);
class Messenger { 
	message = "Hello World"; 
  


	start() { 
		//var _this=this;

		setTimeout(
		() => console.log("hello"), 500); 
		//function() {console.log(this.message);
			//console.log(this);}, 500); 
		} 
	}

 var messenger = new Messenger(); 
 messenger.start();


