
module ns {
  interface Date {
    //................ taken from lib.d.ts
    /** Returns a string representation of a date. The format of the string depends on the locale. */
    toString(): string;
    /** Returns a date as a string value. */
    toDateString(): string;
    /** Returns a time as a string value. */
    toTimeString(): string;
    toLocaleString(): string;
    /** Returns a date as a string value appropriate to the host environment's current locale. */
    toLocaleDateString(): string;
    //................ taken from lib.d.ts

  }
  class MyDate implements Date {
    private mythisdate: Date;
    constructor() {

      this.mythisdate = new Date();
      console.log("in constructor");
    }

    public toDateString() { return this.mythisdate.toDateString(); }
    public toTimeString() { return this.mythisdate.toTimeString(); }
    public toLocaleString() { return this.mythisdate.toLocaleString(); }
    public toLocaleDateString() { return this.mythisdate.toLocaleDateString(); }
    // // the extentions, a static method
    public static printConsole() { console.log("printing"); }
    // and an instance method
    public  printInfo() { console.log("info ",this.mythisdate); }

  }
  var md = new MyDate();
  console.log(md.toDateString());//
  console.log(md.toTimeString());
  MyDate.printConsole();
  md.printInfo();
}
