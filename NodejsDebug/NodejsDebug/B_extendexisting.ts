module nsDate {
    class RichDate {
        public static MinValue = new Date();
    }

    //  interface MoreDate extends Date { MinValue: Date; }
    interface Date {
        MinValue: Date;
    }


    (<any>Date.prototype).MinValue = new Date(0);
    var x: Date = <any>new Date();
    console.log(x.MinValue);



    interface DateStatic extends Date {
        MinValue: Date;
    }

    Date['MinValue'] = new Date(0);

    var y: DateStatic = <any>Date; // We aren't using an instance
    console.log(y.MinValue);

    interface IEngine {
        start(callback: (startStatus: boolean, engineType: string) => void): void;
        stop(callback: (stopStatus: boolean, engineType: string) => void): void;
    }
    interface IAutoOptions {
        engine: IEngine;
        basePrice: number;
        state: string;
        make: string;
        model: string;
        year: number;
    }

    interface ITruckOptions extends IAutoOptions {
        bedLength: string;
        fourByFour: boolean;
    }






    var t2: ITruckOptions;


    interface I1 {
        name: string;
    }
    interface I1 {
        last: string;
    }
    var t3: I1 = <any>{};



    //
    // declare interface Number {
    //     toPreferredStringFormat: () => string;
    // }
    //
    // declare interface Date {
    //     toPreferredStringFormat: () => string;
    // }
    //
    // (function () {
    //     // OK
    //     Number.prototype.toPreferredStringFormat = () => {
    //         return this.toString() + " preferred!";
    //     };
    //
    //     // ERROR (why?!)
    //     Date.prototype.toPreferredStringFormat = () => {
    //         return this.toString() + " preferred!";
    //     };
    // })();


}
