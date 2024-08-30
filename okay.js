let names = "dollarstir|roodev";
let current = "roodev"

let a = names.split("|").filter(name => name !== current);

console.log(a);

console.log("");