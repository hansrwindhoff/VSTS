function newClosure(someNum, someRef) {
    var num = someNum;
    var anArray = [1, 2, 3];
    someRef.someVar++;
    var ref = someRef;
    return function (x) {
        num += x;
        anArray.push(num);
        console.log('num: ' + num +
            ' anArray ' + anArray.toString() +
            ' ref.someVar ' + ref.someVar);
    };
}
var obj = { someVar: 4 };
var fn1 = newClosure(4, obj);
var fn4 = newClosure(5, obj);
fn1(1);
fn4(1);
fn1(2);
fn4(2);
//# sourceMappingURL=newClosure.js.map