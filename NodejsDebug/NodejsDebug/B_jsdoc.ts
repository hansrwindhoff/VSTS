/**
Explicitly name everything. For example:
@namespace My.Namespace
@class My.Namespace.SomeClass
@constructor My.Namespace.SomeClass
@member My.Namespace.SomeClass#_someField
@method My.Namespace.SomeClass#_someMethod

    Description of the namespace.
    @namespace My.Namespace
    */


    module My.Namespace {
        export class SomeClass {

            private nojsdocField:string=null;

        /**
            Description of the field.
            @member My.Namespace.SomeClass#_someField
            @private
            @type {string}
            */
            private _someField: string = null;

        /**
            Description of the constructor.
            @class My.Namespace.SomeClass
            @classdesc Description of the class.
            @param {boolean} value Description of the constructor argument.
            */
            constructor (value: boolean) {
            // omitted
        }

        /**
            Description of the method.
            @method My.Namespace.SomeClass#_someMethod
            @private
            */

            private _someMethod() {
            // omitted
            this._someField;
            this.nojsdocField;
               }



        /**
          sdkmfsdkfm sdkmkl fksdklfm sdfm sk
          @method My.Namespace.SomeClass#_someOtherMethod
          @parame v1 number[]
          @type void because there is nothing to return dah
         */
          _someOtherMethod(v1: number[]): void {
                    // omitted

                }

            }

}

var test = new  My.Namespace.SomeClass(true);
//test._someOtherMethod(1,2,3);
    test._someOtherMethod([1]);//, ["s"],true );

//var test = new  My.Namespace.SomeClass(true);



        /**
          description
          @param {number[]} v1 - this is my input array
          @param {string[]} v2 - this is the output array
          @param {boolean}  v3 - some flag
          @type {void}
         */
    console.log('end');
