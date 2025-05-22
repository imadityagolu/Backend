/**
 * readline - to read input
 * createInterface - to create interface in terminal
 * process - to access terminal
*/
const { exit } = require("process");
const readline = require("readline");
const fs = require("node:fs").promises;
const path = require("path");

const filepath = path.join(__dirname, "task.txt");

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

        const task = await getInput("Type your task => ");

        try{
            await fs.access(filepath);
            const fileContent = await fs.readFile(filepath, "utf8")

            if(fileContent.trim() === ""){
                await fs.writeFile(filepath, task);
                console.log("File created. Task added.");
            }
            else {
                await fs.appendFile(filepath, `\n${task}`)
                console.log("Task added.");
            }

        } 
        catch(error) 
        {
            await fs.writeFile(filepath, task);
            console.log("File created. Task added.");
        }

    } 
    catch (error) 
    {
        console.log("Error while adding task");
    }
}

const viewList = async() => {
    try{
        const data = await fs.readFile(filepath, "utf8");
        return data.split("\n");
    } 
    catch (error) 
    {
        console.log("error reading file");
        return [];
    }
}

const markComplete = async() => {
    try {
        const data = await viewList();
        if(data.length ===0){
            console.log("No task available to mark complete");
            return;
        }
        if( data.length === 1 && data[0].trim() === ""){
            console.log("\nNo task added yet");
            return;
        }
        console.log("\nYour Tasks are :-");
        data.map((line, id) => {
                    console.log(`${id + 1}. ${line}`)
                });

        let id = Number(await getInput("Choose the task to mark => "));
        if(isNaN(id) || id < 1 || id > data.length){
            console.log("invalide task index");
            return;
        }

        data[id - 1] = `✅ ${data[id -1]}`;
        await fs.writeFile(filepath, data.join("\n"));
        console.log("Task marked as completed");
    }
    catch(error)
    {
        console.log("error while marking complete");
    }
}

const deleteTask = async() => {
    try {
        const data = await viewList();
        if(data.length ===0){
            console.log("No task available to delete");
            return;
        }
        if( data.length === 1 && data[0].trim() === ""){
            console.log("\nNo task available to delete");
            return;
        }
        console.log("\nYour Tasks are :-");
        data.map((line, id) => {
                    console.log(`${id + 1}. ${line}`)
                });

        let id = Number(await getInput("Choose the task delete => "));
        if(isNaN(id) || id < 1 || id > data.length){
            console.log("invalide task index");
            return;
        }

        data.splice(id - 1, 1);
        const cleanedData = data.filter(task => task.trim() !== "");
        await fs.writeFile(filepath, cleanedData.join("\n"));
        console.log("Task deleted");
        
    }
    catch(error)
    {
        console.log("error while deleting");
    }
}

async function main() {
    
    while(true){
    console.log("\n1. Add a new task.");
    console.log("2. view a list of task.");
    console.log("3. Mark a tast as complete.");
    console.log("4. Remove a task.");
    console.log("5. Exit");

    const choice = await getInput("Enter your choice 1/2/3/4/5 ? ");
    
    switch (choice){
        case "1":
            await addTask();
            break;
        case "2":
            const data = await viewList();
            if(data.length === 1 && data[0].trim() === ""){
                console.log("\nNo Task Added Yet");
                break;
            }
            if(data.length > 0){
                console.log("\nYour tasks are:-");
                data.map((line, id) => {
                    console.log(`${id + 1}. ${line}`)
                });
            }
            else{
                console.log("\nNo Task Added Yet");
                break;
            }
            break;
        case "3":
            await markComplete();
            break;
        case "4":
            await deleteTask();
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