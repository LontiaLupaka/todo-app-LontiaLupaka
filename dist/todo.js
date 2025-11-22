"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var readline = require("readline");
var tasks = [];
var FILE_PATH = "tasks.json";
var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
function loadTasks() {
    if (fs.existsSync(FILE_PATH)) {
        var data = fs.readFileSync(FILE_PATH, "utf-8");
        tasks = JSON.parse(data);
    }
    else {
        tasks = [];
    }
}
function saveTasks() {
    fs.writeFileSync(FILE_PATH, JSON.stringify(tasks, null, 2));
}
function addTask() {
    rl.question("Enter a new task: ", function (task) {
        if (!task.trim()) {
            console.log("Please add a Task");
            return showMenu();
        }
        tasks.push({ task: task.trim(), completed: false });
        saveTasks();
        console.log("Task added.");
        showMenu();
    });
}
function viewTasks() {
    if (tasks.length === 0) {
        console.log("No tasks available.");
    }
    else {
        console.log("\n====== Tasks ======");
        tasks.forEach(function (t, index) {
            console.log("".concat(index + 1, ". [").concat(t.completed ? 'x' : ' ', "] ").concat(t.task));
        });
    }
    showMenu();
}
function markTaskCompleted() {
    rl.question("Enter the task number to mark as completed: ", function (num) {
        var index = parseInt(num) - 1;
        if (isNaN(index) || index < 0 || index >= tasks.length) {
            console.log("Invalid task number");
            return showMenu();
        }
        tasks[index].completed = true;
        saveTasks();
        console.log("Task marked as completed.");
        showMenu();
    });
}
function deleteTask() {
    rl.question("enter number to delete: ", function (num) {
        var index = parseInt(num) - 1;
        if (isNaN(index) || index < 0 || index >= tasks.length) {
            console.log("Invalid task number");
            return showMenu();
        }
        tasks.splice(index, 1);
        saveTasks();
        console.log("task deleted");
        showMenu();
    });
}
function showMenu() {
    console.log("\n                =====================\n                     TO-DO LIST\n                =====================\n\n                 1. Add Task\n                 2. View Tasks\n                 3. Mark Task as Completed\n                 4. Delete Task\n                 5. Exit\n\n");
    rl.question("choose an option(1-5): ", handleChoice);
}
function handleChoice(choice) {
    switch (choice.trim()) {
        case "1":
            addTask();
            break;
        case "2":
            viewTasks();
            break;
        case "3":
            markTaskCompleted();
            break;
        case "4":
            deleteTask();
            break;
        case "5":
            console.log("👋 Exiting app...");
            rl.close();
            break;
        default:
            console.log(" Invalid choice! Enter a number from 1 to 5.");
            showMenu();
    }
}
loadTasks();
showMenu();
