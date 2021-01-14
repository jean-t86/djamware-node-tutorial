# Djamware Node.js, PostgreSQL & Sequelize Tutorial
## Table of contents
* [General information](#general-information)
* [Technologies](#technologies)
* [Setup](#setup)
* [Database schema](#database-schema)
* [Endpoints](#endpoints)

## General Information
This repository contains the code for the completed [djamware tutorial](https://www.djamware.com/post/5b56a6cc80aca707dd4f65a9/nodejs-expressjs-sequelizejs-and-postgresql-restful-api) on using the Sequelize ORM package in an Express application. Under the hood, the ORM uses PostgreSQL as database for this example.

## Technologies
* JavaScript
* Node.js
* Express.js
* PostgreSQL
* Sequelize ORM

## Setup
In order to run the program, you need to install Node.js on your computer:
* [Download](https://nodejs.org/en/download/) the binaries
* If you use Linux, follow the [installation instructions](https://github.com/nodejs/help/wiki/Installation#how-to-install-nodejs-via-binary-archive-on-linux).

Once installed, install the program's dependencies with `npm install` in your terminal with the project's folder as working directory.

You can then start the Express server by typing `npm start`.

## Database schema
- Classroom:
  - id: `number`
  - class_name: `string`
- Student
  - id: `number`
  - classroom_id: `number`
  - student_name: `string`
- Lecturer
  - id: `number`
  - lecturer_name: `string`
- Course
  - id: `number`
  - lecturer_id: `number`
  - course_name: `string`

## Endpoints
Once you have the server up and running, the following end points will be reachable in `http://localhost:4001/`:

### Classroom
GET
* `/api/classroom`
* `/api/classroom/:id`

POST
* `/api/classroom`
* `/api/classroom/add_with_students`

PUT 
* `/api/classroom/:id`

DELETE
* `/api/classroom/:id`

### Student
GET
* `/api/student`
* `/api/student/:id`

POST
* `/api/student`
* `/api/student/add_course`

PUT 
* `/api/student/:id`

DELETE
* `/api/student/:id`

### Lecturer
GET
* `/api/lecturer`
* `/api/lecturer/:id`

POST
* `/api/lecturer`
* `/api/lecturer/add_with_course`

PUT 
* `/api/lecturer/:id`

DELETE
* `/api/lecturer/:id`

### Course
GET
* `/api/course`
* `/api/course/:id`

POST
* `/api/course`

PUT 
* `/api/course/:id`

DELETE
* `/api/course/:id`
