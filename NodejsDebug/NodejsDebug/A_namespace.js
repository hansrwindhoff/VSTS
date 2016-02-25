/* @flow */
// this make flow analyse this file!!!
var myNamespace;
(function (myNamespace) {
    var aPrivateVar = "test";
    myNamespace.aVisibleVar = "test";
})(myNamespace || (myNamespace = {}));
//myNamespace.aPrivateVar=
myNamespace.aVisibleVar = "I see you";
//# sourceMappingURL=A_namespace.js.map