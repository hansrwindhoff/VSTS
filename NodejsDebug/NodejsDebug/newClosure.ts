function newClosure(someNum, someRef) {
    // Local variables that end up within closure
    var num = someNum;
    var anArray = [1,2,3];
    someRef.someVar ++;
    var ref = someRef;
    return x => {
      num += x;
      anArray.push(num);
      console.log
      ('num: ' + num +
        ' anArray ' + anArray.toString() +
        ' ref.someVar ' + ref.someVar);
    }
}
var obj = {someVar: 4};
var fn1 = newClosure(4, obj);
var fn2 = newClosure(5, obj);
fn1(1); // num: 5; anArray: 1,2,3,5; ref.someVar: 4;
fn2(1); // num: 6; anArray: 1,2,3,6; ref.someVar: 4;

fn1(2); // num: 7; anArray: 1,2,3,5,7; ref.someVar: 5;
fn2(2); // num: 8; anArray: 1,2,3,6,8; ref.someVar: 5;