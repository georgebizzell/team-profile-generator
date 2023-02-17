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
        name: "name",
        message: "Enter the team manager's name"
    },
    {
        type: "input",
        name:"id",
        message: "Enter the team manager's ID"
    },
    {
        type: "input",
        name:"email",
        message: "Enter the team manager's email address"
    },
    {
        type: "input",
        name:"officeNumber",
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
        message: "Enter the person's name?"
    },
    {
        type: "input",
        name:"email",
        message: "Enter the person's email address"
    },
    {
        type: "input",
        name:"id",
        message: "Enter their Employment ID?"
    }
];

const engineerQuestions = [
    {
        type: "input",
        name:"github",
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
            inquirer.prompt(engineerQuestions).then((githubName) => {

            let newEngineer = new Engineer (nameID.name, nameID.id, nameID.email, githubName.github)
            
            team.Engineer = newEngineer;

            employeeTypeSelection();

        })
        }
        else if (employeeType.menuChoice == "Intern")
        {
            inquirer.prompt(internQuestions).then((schoolName) => {

            let newIntern = new Intern (nameID.name, nameID.id, nameID.email, schoolName.school)
            
            team.Intern = newIntern;

            employeeTypeSelection();
        })
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
        
        const newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)

        team.manager = newManager;

        console.log(team);

        employeeTypeSelection();

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
