# Node-MySQL-Rest-API-Passport-JWT
Simple RESTful API implementation on Node.js + Express + MySQL + Passport + JWT

REST API for CRUD operations with database using Node.js and Express.js framework with MySQL. For access control this project use Passport.js and JSON Web Token.

# Running project

You need to have installed Node.js and MySQL on your local machine.

## Install dependencies

To install dependencies enter project folder and run following command:

`npm install`


## Setting up local MySQL database

First edit `/model/dbconnection.js` and `/config/database.js` to add your username and password and database for your local MySQL database.

To create user table for Passport signup and login, run `node scripts/create_database.js

## To run server execute:

`node server.js`

## License

MIT
