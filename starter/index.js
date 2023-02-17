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
const employeeTypeMenu = [
    {
        type: "list",
        message: "Please select an employee type from the list or finish building the team",
        name: "menuChoice",
        choices: ["Engineer", "Intern", "Finish"]
    }
]

const employeeQuestions = [
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

const engineerQuestions = [
    {
        type: "input",
        name:"gitHub",
        message: "Enter the Engineer's gitHub"
    }
];

const internQuestions = [
    {
        type: "input",
        name:"school",
        message: "Enter the Intern's school"
    }
];

function nameAndId(employeeType) {
    inquirer.prompt(employeeQuestions).then((nameID) => {
        
        if(employeeType.menuChoice == "Engineer")
        {
            inquirer.prompt(engineerQuestions).then((github) => {

            nameID.push(github) = engineerDetails;

            const newEngineer = new Engineer (engineerDetails)
            
            team.Engineer = newEngineer;
        })
        }
        else if (employeeType.menuChoice == "Intern")
        {
            inquirer.prompt(internQuestions).then((school) => {

            nameID.push(school) = internDetails;

            const newIntern = new Intern (internDetails)
            
            team.Intern = newIntern;
        })
    }})

        .catch((error) => {
            if (error.isTtyError) {
              console.log("Prompt couldn't be rendered in the current environment");
            } else {
              console.log("Something else went wrong");
            }
          });
}

function employeeTypeSelection() {
    inquirer.prompt(employeeTypeMenu).then((typeOrFinish) => {
        
        if (typeOrFinish.menuChoice === 'Finish')
            {
                generateTeam(team);
            }
        else
        {
            nameAndId(typeOrFinish)
        }
    })
        .catch((error) => {
            if (error.isTtyError) {
              console.log("Prompt couldn't be rendered in the current environment");
            } else {
              console.log("Something else went wrong");
            }
          });
}

const team = {};

// function to initialize program
function init() {
    inquirer.prompt(managerQuestions).then((answers) => {
        
        const newManager = new Manager(answers)

        team.manager = newManager;

        console.log(answers);
        
        console.log(newManager);

        console.log(team.manager);

        }

      )
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
