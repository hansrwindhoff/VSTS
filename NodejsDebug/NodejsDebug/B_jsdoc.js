/* @flow */
// this make flow analyse this file!!!
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
var My;
(function (My) {
    var Namespace;
    (function (Namespace) {
        var SomeClass = (function () {
            /**
                Description of the constructor.
                @class My.Namespace.SomeClass
                @classdesc Description of the class.
                @param {boolean} value Description of the constructor argument.
                */
            function SomeClass(value) {
                this.nojsdocField = null;
                /**
                    Description of the field.
                    @member My.Namespace.SomeClass#_someField
                    @private
                    @type {string}
                    */
                this._someField = null;
                // omitted
            }
            /**
                Description of the method.
                @method My.Namespace.SomeClass#_someMethod
                @private
                */
            SomeClass.prototype._someMethod = function () {
                // omitted
                this._someField;
                this.nojsdocField;
            };
            /**
              sdkmfsdkfm sdkmkl fksdklfm sdfm sk
              @method My.Namespace.SomeClass#_someOtherMethod
              @parame v1 number[]
              @type void because there is nothing to return dah
             */
            SomeClass.prototype._someOtherMethod = function (v1) {
                // omitted
            };
            return SomeClass;
        }());
        Namespace.SomeClass = SomeClass;
    })(Namespace = My.Namespace || (My.Namespace = {}));
})(My || (My = {}));
var test = new My.Namespace.SomeClass(true);
//test._someOtherMethod(1,2,3);
test._someOtherMethod([1]); //, ["s"],true );
//var test = new  My.Namespace.SomeClass(true);
/**
  description
  @param {number[]} v1 - this is my input array
  @param {string[]} v2 - this is the output array
  @param {boolean}  v3 - some flag
  @type {void}
 */
console.log('end');
//# sourceMappingURL=B_jsdoc.js.map