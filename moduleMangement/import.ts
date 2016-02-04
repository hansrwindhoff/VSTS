/// <reference path="./node.d.ts" />
// compile with -- module AMD when using a browser and require.js
// compile with comminjs when using node (which has a build-in require)
"use strict";
console.log("Start loading import.js");
import fs = require('fs');
import myimport = require('./tobeimported');

myimport.myLog(); 

console.log("Done loading and calling import.js");


