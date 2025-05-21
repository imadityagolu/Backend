const readline = require("readline");
const { stdin, stdout } = require("process");

const greetings = () => { 
const r1 = readline.createInterface({
    input: stdin,
    output: stdout,
});

r1.question("Type your name?\n", (answer) => {
    console.log(`\nHello ${answer} welcome to Adityas npm package`);
    r1.close();
});
}

module.exports = greetings;