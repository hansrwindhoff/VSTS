interface ImybaseObj {
    a: number[];
}
interface ImyextendedObj extends ImybaseObj {
    b: number[];
}
interface I2ndmyextendedObj extends ImyextendedObj {
    sumOverAGreaterZero: boolean;
}
interface Ifct2<T extends ImybaseObj> {
    (inputPara: T, cb: (d: T) => boolean): T;
}
interface Ifct3<T extends ImybaseObj, U extends ImybaseObj> {
    (inputPara: T, cb: (d: T) => boolean): U;
}
declare var u: {
    a: number[];
    b: number[];
    c: number[];
};
declare var v: {
    a: number[];
    b: number[];
};
declare var w: {
    a: number[];
};
declare var t3: Ifct3<ImyextendedObj, I2ndmyextendedObj>;
declare var x: I2ndmyextendedObj;
