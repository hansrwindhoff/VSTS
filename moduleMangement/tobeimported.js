define(["require", "exports"], function (require, exports) {
    console.log("Start loading tobeimported.js");
    function myLog() {
        console.log("Hello from module");
    }
    exports.myLog = myLog;
    console.log("Loaded tobeimported.js");
});
