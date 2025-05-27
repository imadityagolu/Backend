const { exit } = require("process");
const readline = require("readline");

const numbers = [1, 2, 2, 3, 4, 4, 5];

const objects = [
  { id: 1, name: 'Alice', age: 25 },
  { id: 2, name: 'Bob', age: 30 },
  { id: 3, name: 'Alice', age: 35 }
];

const getInput = (question) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise((res) => {
        rl.question(question, (answer) => {
            res(answer);
            rl.close();
        });
    });
};

// 1. Sum of all numbers in the array
Array.prototype.sum = function() {
  return this.reduce((acc, curr) => acc + Number(curr), 0);
};

// 2. Remove all duplicates from the array
Array.prototype.unique = function() {
  return [...new Set(this)];
};

// 3. Group elements by a key (returns object with grouped values)
Array.prototype.groupBy = function(keyFn) {
  return this.reduce((acc, item) => {
    const key = keyFn(item);
    acc[key] = acc[key] || [];
    acc[key].push(item);
    return acc;
  }, {});
};

// 4. Partition array based on a predicate
Array.prototype.partition = function(predicate) {
  return this.reduce(([pass, fail], item) => 
    predicate(item) ? [[...pass, item], fail] : [pass, [...fail, item]],
    [[], []]
  );
};

// 5. Find the maximum value in array
Array.prototype.max = function() {
  return Math.max(...this);
};

// 6. Find the minimum value in array
Array.prototype.min = function() {
  return Math.min(...this);
};

// 7. Chunk array into smaller arrays of specified size
Array.prototype.chunk = function(size) {
  return Array.from({ length: Math.ceil(this.length / size) }, (_, i) =>
    this.slice(i * size, i * size + size)
  );
};

// 8. Pluck specific property from array of objects
Array.prototype.pluck = function(property) {
  return this.map(item => item[property]);
};

// 9. Shuffle array elements
Array.prototype.shuffle = function() {
  return this.sort(() => Math.random() - 0.5);
};

// 10. Calculate average of array numbers
Array.prototype.average = function() {
  return this.length ? this.sum() / this.length : 0;
};

async function tenFunctions() {
    while (true) {
        console.log("\n1. Sum:");
        console.log("2. Unique:");
        console.log("3. Group by name:");
        console.log("4. Partition even/odd:");
        console.log("5. Max:");
        console.log("6. Min:");
        console.log("7. Chunk (size 3):");
        console.log("8. Pluck names:");
        console.log("9. Shuffle:");
        console.log("10. Average:");
        console.log("11. Exit:");

        const choice = await getInput("Enter your choice number ? ");

        switch (choice) {
            case "1":
                console.log("Answer =", numbers.sum());
                break;
            case "2":
                console.log("Answer =", numbers.unique());
                break;
            case "3":
                console.log("Answer =", JSON.stringify(objects.groupBy(item => item.name), null, 2));
                break;
            case "4":
                console.log("Answer =", JSON.stringify(numbers.partition(num => num % 2 === 0), null, 2));
                break;
            case "5":
                console.log("Answer =", numbers.max());
                break;
            case "6":
                console.log("Answer =", numbers.min());
                break;
            case "7":
                console.log("Answer =", JSON.stringify(numbers.chunk(3), null, 2));
                break;
            case "8":
                console.log("Answer =", objects.pluck('name'));
                break;
            case "9":
                console.log("Answer =", numbers.shuffle());
                break;
            case "10":
                console.log("Answer =", numbers.average());
                break;
            case "11":
                console.log("Exiting...");
                process.exit(0);
                break;
            default:
                console.log("Enter a valid number");
                break;
        }
    }
}

// Run the function when the file is executed directly
if (require.main === module) {
    tenFunctions().catch(err => {
        console.error("Error:", err);
        process.exit(1);
    });
}

module.exports = tenFunctions;