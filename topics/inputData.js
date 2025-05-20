const readline = require("readline");
const { stdin, stdout } = require("process");

const r1 = readline.createInterface({
    input: stdin,
    output: stdout,
});

r1.question("Type your name?\n", (answer) => {
    console.log(`\nMy name is ${answer}`);
    r1.close();
});