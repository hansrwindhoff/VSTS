// es6
/* @flow */
// this make flow analyse this file!!!
module t2 {
    //lexically scoped  or dynamically scoped

    class Messenger {
        message = "Hello World";

        start() {
            setTimeout(

                () => {
                    console.log(this.message);

                }
                //
                // function() {
                //     console.log(this.message);
                //
                // }


                , 1500);
        }
    }


    var messenger = new Messenger();
    messenger.start();



}
