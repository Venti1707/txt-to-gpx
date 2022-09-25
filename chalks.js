const C = require('chalk');
console.time(C.magentaBright("Magenta"));
console.error(C.redBright("Red"));
console.log(C.greenBright("Green"));
console.warn(C.hex('#FFA500')('Orange'))
console.timeEnd(C.magentaBright("Magenta"));

/*
    List of consoles
        - console.time & console.timeEnd (Magenta)
        - console.error (Red)
        - console.log (Green)
        - console.warn (Orange)

*/