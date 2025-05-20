/**
 * readline - to read input
 * createInterface - to create interface in terminal
 * process - to access terminal
*/
const readline = require("readline");

const getInput = (question) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise ((res) => {
        
    })
}