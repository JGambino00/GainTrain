const express = require("express");
const db = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");
require('dotenv').config();

const UserController = express.Router()

UserController.use(express.json());
UserController.use(cookieParser());
UserController.use(cors({credentials: true, origin: 'http://localhost:3000'}));
UserController.use(express.static(path.join(__dirname, "../client/build")));
UserController.use(express.static(__dirname + "../client/public/"));
UserController.use(bodyParser.urlencoded({extended: true}));
UserController.use(bodyParser.json())
UserController.use(express.static('dist'));


UserController.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// start of sign up and login. creating correct cookies if logged in
UserController.get('/checkAuth', function (req, res) {
    if (!req.cookies) {
        res.status(403).send();
    } else {
        const token = req.cookies.token;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
            if (err) {
                res.status(403).send();
            } else {
                res.send({email: data, id: req.cookies.id});
            }
        })
    }
})


//getting the email and passowrd from the form
UserController.post("/Login", async (req, res) => {
    try {
        //fields were provided by the front end form
        if (!req.body.email) {
            throw err;
        }
        let email = req.body.email;

        //query statement
        let state = `SELECT U.Email, U.ID FROM users U WHERE U.Email = "${email}";`;

        //console.log(state) // used to verify the query
        //parameters: Email
        //returns: 
        db.query(state, async (err, result) => {
                try {
                    if (err) {
                        console.log('err: ' + err)
                    } //indicator for errors when executing a query
                    else {
                        if (!result[0]) {
                            throw err;
                        } else if (await email === result[0].Email) {

                            //await needs "async" in the 'parent'
                            if (jwt.sign(email, process.env.ACCESS_TOKEN_SECRET, (error, token) => {
                                    if (error) {
                                        console.log('Wrong Password');
                                        console.log(error)
                                        res.status(403).send();
                                    } else {
                                        let update = `UPDATE users SET Token = "${token}" WHERE email = "${email}"`
                                        //parameters: Token, Email
                                        //returns: 
                                        db.query(update, async (err2, result2) => {
                                            if (err2) {
                                                console.log("err2: " + err2)
                                            } else {
                                                res.cookie('token', token);
                                                res.cookie('id', result[0].ID)
                                                res.sendStatus(200);
                                            }
                                        })
                                    }
                                }
                            )
                            ) ;
                        } else {
                            throw err
                        }
                    }
                } catch (err) {
                    res.status(500).send();
                }
            }
        )
    } catch (err) {
        res.status(500).send()
    }
})

//getting the email and passowrd from the form
UserController.post("/Signup", async (req, res) => {
    let existing = false;
    let uid;
    //parameters: Email
    //returns: ID, FName, LName, Email, Password, Validated, Phone, Birthday, Address, Role, Token
    let state = "SELECT * FROM gaintrain.users U WHERE U.email = ?"
    db.query(state, [req.body.email], async (err, result) => {

        if (result.length !== 0) {
            existing = true;
        }
    });
    // select last auto increment
    //parameters: 
    //returns: ID
    let state2 = `SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = "gaintrain" AND TABLE_NAME = "users"`
    db.query(state2, [], async (err, result) => {

        uid = result.AUTO_INCREMENT;
    });
    try {
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;

        let uid;

        let state = `INSERT INTO gaintrain.users (FName, LName, Email) VALUES (?,?,?);`;//figure out how to pass variables i created in


        if (existing === false) {
            //parameters:FName, LName, Email, Password, Validated, Phone, Role
            //returns: 
            db.query(state, [firstName, lastName, email], function (err, result) {//ID might be removed since it should be auto indent
                if (err) {
                    console.log(err)
                    res.sendStatus(500);
                }
                uid = result.insertId;

            })
            res.sendStatus(200);
        }
        // final send
        else
            res.status(500).send()
    } catch {
        res.status(500).send()

    }
})
// end of sign up and login

UserController.post("/submitExercise", (req, res) => {

    let id = req.body.id;
    let exerciseName = req.body.exerciseName;
    let sets = req.body.sets; 
    let reps = req.body.reps;
    let weight = req.body.weight;
    let timestamp = Date.now();
    
    console.log(req.body);
 
    let state = "INSERT INTO gaintrain.exercises (patientfiles,patientID, timesubmitted) VALUES (?,?,?)"
    db.query(state, [patientFile, patientID,timeNow],
        (err, results) => {
            if (err) {
                console.log(err);
            } else {
                res.send("File uploaded!");
            }
        }
    );
//attempted INSERT INTO patientfiles (patientfiles, patientID, timesubmitted) VALUES (LOAD_FILE('C:/Users/chanj/Downloads/Project_v2'),1,'2022-3-27 12:00:00'); as a test
});

// clearing cookies on logout
UserController.post('/Logout', ((req, res) => {
    res.clearCookie('token');
    res.clearCookie('id');
    res.status(200).send();
}));

module.exports = UserController;