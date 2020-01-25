const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

const engineers = [];
const interns = [];

// Prompt user's team list. They can have 1 manager and any number of engineers and interns.
function promptUserManager() {
    return inquirer
      .prompt([
        {
            type: "input",
            message: "Enter the name of the manager:",
            name: "name"
        }, 
        {
            type: "input",
            message: "Enter the id of the manager:",
            name: "id"
        },
        {
            type: "input",
            message: "Enter the email of the manager:",
            name: "email"
        },
        {
            type: "input",
            message: "Enter the office number of the manager:",
            name: "officeNumber"
        }
      ]);
}

function promptUserNumber() {
    return inquirer
      .prompt([
        {
            type: "input",
            message: "How many engineers do you want on your team?",
            name: "engineerNumber"
        }, 
        {
            type: "input",
            message: "How many Interns do you want on your team?",
            name: "internNumber"
        }
      ]);
}

function promptUserEngineer() {
    return inquirer
      .prompt([
        {
            type: "input",
            message: "Enter the name of this engineer:",
            name: "name"
        }, 
        {
            type: "input",
            message: "Enter the id of this engineer:",
            name: "id"
        },
        {
            type: "input",
            message: "Enter the email of this engineer:",
            name: "email"
        },
        {
            type: "input",
            message: "Enter the GitHub username of this engineer:",
            name: "github"
        }
      ]);
}

function promptUserIntern() {
    return inquirer
      .prompt([
        {
            type: "input",
            message: "Enter the name of this intern:",
            name: "name"
        }, 
        {
            type: "input",
            message: "Enter the id of this intern:",
            name: "id"
        },
        {
            type: "input",
            message: "Enter the email of this intern:",
            name: "email"
        },
        {
            type: "input",
            message: "Enter the school of this intern:",
            name: "school"
        }
      ]);
}


(async function() {
    try {
        //Wait on user's data on 1 manager and then store input into manager object
        const inputManagerData = await promptUserManager();
        const inputName = inputManagerData.name;
        const inputId = inputManagerData.id;
        const inputEmail = inputManagerData.email;
        const inputOfficeNumber = inputManagerData.officeNumber;
        const manager = new Manager(inputName, inputId, inputEmail, inputOfficeNumber);
        console.log(manager);

        // Wait on number of Engineers and Interns they want
        const inputNumbers = await promptUserNumber();

        // Store number of Engineers and Interns they want
        const inputEngineerNumber = parseInt(inputNumbers.engineerNumber);
        const inputInternNumber = parseInt(inputNumbers.internNumber);
        console.log(`You want ${inputEngineerNumber} engineer(s)`);
        console.log(`You want ${inputInternNumber} intern(s)`);

        // Create object for each number of Engineers they provided
        for (let i = 0; i < inputEngineerNumber; i++) {
            const inputEngeneerData = await promptUserEngineer();
            const inputName = inputEngeneerData.name;
            const inputId = inputEngeneerData.id;
            const inputEmail = inputEngeneerData.email;
            const inputGithub = inputEngeneerData.github;
            const newEngineer = new Engineer (inputName, inputId, inputEmail, inputGithub);
            // console.log(newEngineer);
            engineers.push(newEngineer);
        }

        console.log(engineers);

        // Create object for each number of Interns they provided
        for (let i = 0; i < inputInternNumber; i++) {
            const inputInternData = await promptUserIntern();
            const inputName = inputInternData.name;
            const inputId = inputInternData.id;
            const inputEmail = inputInternData.email;
            const inputSchool = inputInternData.school;
            const newIntern = new Intern (inputName, inputId, inputEmail, inputSchool);
            // console.log(newIntern);
            interns.push(newIntern);
        }

        const html = `
            <!DOCTYPE html>
            <html lang="en">

            <head>
            <meta charset="UTF-8">
            <title>Team Profile</title>
            </head>
                <body>
                    ${engineers.map(engineer => `<div>${engineer.name}</div>`)}
                </body>
            </html>`;

        console.log(html);

    } catch (err) {
        console.log(err);
    }
  })();