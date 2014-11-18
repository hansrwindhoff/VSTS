// compile with -- module AMD
define(["require", "exports", './tobeimported'], function (require, exports, myimport) {
    console.log("Start loading import.js");
    myimport.myLog();
    console.log("Loaded import.js");
});
