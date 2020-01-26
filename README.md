# Team Profile Generator

This is a Node CLI command-line application that takes in information about employees and generates an HTML webpage that displays summaries for each person.

## Demo of Application
Answering prompts in the command-line:

![Demo 1](./assets/gifs/demo-1.gif)

Generating the HTML webpage:

![Demo 2](./assets/gifs/demo-2.gif)

## Instructions
Initialize with required npm packages using this command:

```sh
npm install
```

The application will be invoked with the following command:

```sh
node app.js
```

The application will prompt the user for information about the team manager and then information about the team members. The user can input any number of team members, and they may be a mix of engineers and interns.

The HTML page will be populated with the following:

* Summaries cards of the following team memebers:
    * 1 manager with the following:
        * name
        * id
        * link to email
        * office number
    * Any number of engineers each with the following:
        * name
        * id
        * link to email
        * link to GitHub Profile
    * Any number of interns each with the following:
        * name
        * id
        * link to email
        * school

## User Story

```
AS A manager

I WANT to generate a webpage that displays my team's basic info

SO THAT I have quick access to emails and GitHub profiles
```

## Business Context

When establishing a strong development team, it is important to have up-to-date information about members. Rather than navigating to each team member's contact information in scattered locations, a command-line application will allow for quick and easy generation of profiles and contact information in HTML format.

## Acceptance Criteria

```
GIVEN the user has a prospective team to gather

WHEN prompted for the number and type of team members and their contact information

THEN an HTML webpage is generated displays summaries for each person
```

- - -
© 2019 [Madeline Jimenez](https://github.com/mijimenez)