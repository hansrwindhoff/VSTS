var regex = /[a-z]$/i;
var regex2 = /[a-z/]$/i;
var r3 = /[0-9]$/;

console.log(r3.test("42"));
console.log(r3.exec("42"));

console.log(regex2.exec("ggg"));

var r2 = new RegExp("/[a-b]$/");
console.log(r2.exec("ggg"));
//# sourceMappingURL=regex.js.map
