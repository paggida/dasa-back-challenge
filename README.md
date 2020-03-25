# Dasa Challenge (Back End)
API for maintenance of laboratories and exams.

## Technologies used
- NodeJs in API.
- MongoDB in data base.

## Prerequisite
It's necessary that in the application environment you've:<br>
- MongoDB (https://www.mongodb.com/).
- NodeJs (https://nodejs.org/en/).
- Dependency management, you may choose Yarn (https://yarnpkg.com/lang/en/) or NPM (It come with Node's installation).

## Installation*

For the correct operation of the application, it's necessary to perform the following procedures:<br>

- Load libraries for project using the commands below in project directory, it's corresponding to your dependency management:

      yarn

  or

       npm install

*&#42; This topic is detailed in docs path of this repository.*

## Usage

At the root of project path use the command below, it's corresponding to your dependency management:

     yarn start

or

    npm run start

The console will display the link  `API documentation: <API Documentation url>` to a swagger documentation. If it's the first time that you use the application, follow the next steps:
- In the swagger documentation, go th the endpoint `/exam/type/install`;
- Click in the button `Try it out`;
- Click the button `Execute`;
- Now your application is ready to use.

## Functionality

The API allow you:

- register a new laboratory and exam (unitary or batch);
- obtain a list of laboratories and exams (complete, active ou inactive);
- obtain a list of exam types;
- obtain details about a specific laboratory, exam or exam type;
- update an existing laboratory and exam (unitary or batch);
- logically remove laboratory and exam;
- delete laboratory and exam;
- link an active exam with an active laboratory;
- unlink an active exam from an active lab;
- search for exam name that return all laboratories associated with that exam.

## Documentation
In the docs path there is a document describing the architecture used in the application and the configuration process with more details.
