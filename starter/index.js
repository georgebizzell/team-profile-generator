const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

// function to initialize program
function init() {
    inquirer.prompt(managerQuestions).then((answers) => {
        
        console.log(answers);
      })
      .catch((error) => {
        if (error.isTtyError) {
          console.log("Prompt couldn't be rendered in the current environment");
        } else {
          console.log("Something else went wrong");
        }
      });
}

// function call to initialize program
init();

// Initial question to find out team manager
const managerQuestions = [
    {
        type: "input",
        name: "teamManagerName",
        message: "Enter the team manager's name"
    },
    {
        type: "input",
        name:"teamManagerId",
        message: "Enter the team manager's ID"
    },
    {
        type: "input",
        name:"teamManagerEmail",
        message: "Enter the team manager's email address"
    },
    {
        type: "input",
        name:"teamManagerOfficeNumber",
        message: "Enter the team manager's office number"
    }
];


// Questions to ask team manager
const employeeQuestions = [
    {
        type: "list",
        message: "Please select an employee type from the list or finish building the team",
        name: "license",
        choices: ["Engineer", "Intern", "Finish"]
    },
    {
        type: "input",
        name:"name",
        message: "What is the person's name?"
    },
    {
        type: "input",
        name:"id",
        message: "What is their Employment ID?"
    }
];

