const fs = require("fs");

function print(err, data) {
    if (err) {
        console.log("error");
    } else {
        console.log(data);
    }
}
fs.readFile("a.txt", "utf-8", print); //async

fs.readFile("b.txt", "utf-8", print);

console.log("Done");
