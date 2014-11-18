
//lexically scoped  or dynamically scoped
// console.log(this);
class Messenger { 
	message = "Hello World"; 
  


	start() { 


		setTimeout(
		 () => console.log(this.message), 500); 
		//function() { console.log(this.message); }		, 500); 
		} 
	}

 var messenger = new Messenger(); 
 messenger.start();


