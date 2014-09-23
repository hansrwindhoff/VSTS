module t2 {
  //lexically scoped  or dynamically scoped
  var readlineSync = require('readline-sync');

  class Messenger {
    message = "Hello World";

    start() {
      setTimeout(
        () => {
          console.log(this.message);
          readlineSync.question('hit enter to exit? :');
        }
        , 500);
      //function() {
      //  console.log(this.message);
      //  
      //}, 500); 
    }
  }


  var messenger = new Messenger();
  messenger.start();



}