var myNamespace;
(function (myNamespace) {
    var aPrivateVar = "test";
    myNamespace.aVisibleVar = "test";
})(myNamespace || (myNamespace = {}));
myNamespace.aVisibleVar = "I see you";
