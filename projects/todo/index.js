/**
 * readline - to read input
 * createInterface - to create interface in terminal
 * process - to access terminal
*/
const { exit } = require("process");
const readline = require("readline");
const fs = require("node:fs");

const getInput = (question) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise ((res) => {
        rl.question(question, (answer) => {
            res(answer);
            rl.close();
        });
    });
};

const addTask = async() => {
    try{
        const task = await getInput("Type your task: ");
        fs.appendFile("task.txt", "\n"+task, (error) => {
            if(error){
                console.log("Error while adding new task");
                return;
            }
            console.log("\nTask added => " + task);
        });
    } catch (error) {
        console.log(error);
    }
}

const readFile = async() => {
    try{
        fs.readFile("task.txt",(error,data) => {
            if(error){
                console.log("ERROR while reading file")
                return;
            }
            console.log("\nYour Tasks are:-\n"+data.toString())
        });
    } catch (error) {
        console.log(error);
    }
}

async function main() {
    
    while(true){
    console.log("\n1. Add a new task.");
    console.log("2. view a list of task.");
    console.log("3. Mark a tast as complete.");
    console.log("4. Remove a task.");
    console.log("5. Exit");

    const choice = await getInput("Enter your choice 1/2/3/4/5 ?_");
    
    switch (choice){
        case "1":
            await addTask();
            break;
        case "2":
            await readFile();
            break;
        case "3":
            break;
        case "4":
            break;
        case "5":
            exit();
            break;
        default:
            console.log("Enter a valid number");
            break;
    }

    }

}

main();