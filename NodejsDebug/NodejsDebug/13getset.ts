// es6

module t2 {

  class HaveAGetSet {

    private _aNumber: number;
    get aNumber() {
      return this._aNumber;
    }
    set aNumber(val) {
      this._aNumber = val;
    }


  }



  var t1 = new HaveAGetSet();
  t1.aNumber = 42;
  console.log(t1.aNumber);
}