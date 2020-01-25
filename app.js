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
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title p-5>Team Profile</title p-5>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            <script src="https://kit.fontawesome.com/7b4d2fea99.js" crossorigin="anonymous"></script>
            <link rel="stylesheet" href="assets/css/style.css">
            </head>
            <body class="text-center">
                <nav class="p-3">
                    <h4>My Team</h4>
                </nav>
                <div class="wrapper d-flex flex-wrap my-5">

                    <div class="card manager-card shadow-sm">
                        <i class="fas fa-mug-hot team-icon manager-icon shadow"></i>
                        <div class="title py-5 px-3">
                            <h2>${manager.name}</h2>
                            <h3 class="manager-title">Manager</h3>
                        </div>
                        <ul class="p-4">
                            <li>ID: ${manager.id}</li>
                            <li>Email: <a href="mailto:${manager.email}" target="_top" class="manager-link">${manager.email}</a></li>
                            <li>Office Number: ${manager.officeNumber}</li>
                        </ul>
                    </div>

                    ${engineers.map(engineer => `
                    <div class="card engineer-card shadow-sm">
                        <i class="fas fa-glasses team-icon engineer-icon shadow"></i>
                        <div class="title py-5 px-3">
                            <h2>${engineer.name}</h2>
                            <h3 class="engineer-title">Engineer</h3>
                        </div>
                        <ul class="p-4">
                            <li>ID: ${engineer.id}</li>
                            <li>Email: <a href="mailto:${engineer.email}" target="_top" class="engineer-link">${engineer.email}</a></li>
                            <li>GitHub: <a href="https://github.com/${engineer.github}" class="engineer-link">${engineer.github}</a></li>
                        </ul>
                    </div>
                    `).join("")}

                    ${interns.map(intern => `
                    <div class="card intern-card shadow-sm">
                        <i class="fas fa-graduation-cap team-icon intern-icon shadow"></i>
                        <div class="title py-5 px-3">
                            <h2>${intern.name}</h2>
                            <h3 class="intern-title">Intern</h3>
                        </div>
                        <ul class="p-4">
                            <li>ID: ${intern.id}</li>
                            <li>Email: <a href="mailto:${intern.email}" target="_top" class="intern-link">${intern.email}</a></li>
                            <li>School: ${intern.school}</li>
                        </ul>
                    </div>
                    `).join("")}

                </div>
            </body>
            </html>
        `;

        console.log(html);

        // Write this html into an actual html file
        await writeFileAsync(`team_profile.html`, html);
        console.log(`Generated team_profile.html`);

    } catch (err) {
        console.log(err);
    }
  })();