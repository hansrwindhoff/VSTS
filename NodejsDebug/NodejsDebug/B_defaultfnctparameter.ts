
// optional parameter
var fn2 = (parameter?: number) => {
  if (parameter) {
    console.log(parameter);
  }
  else{
    console.log('no parameter');
  }
  return true;
}

// default parameter
var fn3 = (parameter: number = 42) => {
  console.log( parameter);

  return true;
}


fn2();
fn2(123);
fn3();
fn3(234);
