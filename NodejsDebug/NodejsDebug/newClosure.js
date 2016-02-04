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
var fn2 = newClosure(5, obj);
fn1(1);
fn2(1);
fn1(2);
fn2(2);
