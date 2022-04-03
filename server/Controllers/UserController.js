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

// Start of sign up and login. creating correct cookies if logged in
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


        let state = `SELECT U.Email, U.ID FROM users U WHERE U.Email = "${email}";`;

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

//Getting the email and passowrd from the form
UserController.post("/Signup", async (req, res) => {
    let existing = false;
    let uid;
    let state = "SELECT * FROM gaintrain.users U WHERE U.email = ?"
    db.query(state, [req.body.email], async (err, result) => {

        if (result.length !== 0) {
            existing = true;
        }
    });

    let state2 = `SELECT AUTO_INCREMENT FROM information_schema.TABLES WHERE TABLE_SCHEMA = "gaintrain" AND TABLE_NAME = "users"`
    db.query(state2, [], async (err, result) => {

        uid = result.AUTO_INCREMENT;
    });
    try {
        let firstName = req.body.firstName;
        let lastName = req.body.lastName;
        let email = req.body.email;

        let uid;

        let state = `INSERT INTO gaintrain.users (FName, LName, Email, Experience, Level) VALUES (?,?,?,?,?);`;//figure out how to pass variables i created in


        if (existing === false) {

            db.query(state, [firstName, lastName, email, 0, 1], function (err, result) {//ID might be removed since it should be auto indent
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

//Takes in the values that the user submitted for their exercise and inputs it
//into the database. Also alters the experience points and level of the user.
UserController.post("/submitExercise", (req, res) => {

    var id = req.body.id;
    let exerciseName = req.body.exerciseName;
    let sets = req.body.sets; 
    let reps = req.body.reps;
    let weight = req.body.weight;
    let timestamp = Date.now();
    let mins = 0;
    let speed = 0;
    
    console.log(req.body);
 
    let state = "INSERT INTO gaintrain.exercises (ID, ExerciseName, Sets, Reps, Weight, Mins, Speed, Timestamp) VALUES (?,?,?,?,?,?,?,?)"
    db.query(state, [id, exerciseName, sets, reps, weight, mins, speed, timestamp],
        (err, result) => {
            if (err) {
                console.log(err);
            } 
        }
    );

    let state2 = "SELECT Level, Experience FROM gaintrain.users WHERE ID=?"
    db.query(state2, [id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                var currentxp=result[0].Experience;
                var currentlevel=result[0].Level;

                if(currentxp===9){
                    let newXp=0;
                    let newLevel=currentlevel+1;

                    let state3 = "UPDATE gaintrain.users SET Experience=?, Level=? WHERE ID=?"
                    db.query(state3, [newXp, newLevel, id],
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            }else{
                                res.send(result);
                            } 
                        }
                    );
                }else{
                    let newXp=currentxp+1;

                    let state4 = "UPDATE gaintrain.users SET Experience=? WHERE ID=?"
                    db.query(state4, [newXp, id],
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            }else{
                                res.send(result);
                            } 
                        }
                    );
                }
            }
        }
    );

});

//Returns the current experience points and levels for the user.
UserController.get("/xpLevel", (req, res) => {
    let id = req.query.id;
    let state = "SELECT Experience, Level FROM gaintrain.users WHERE ID=?";
    db.query(state, [id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                res.send(result);
            }
        }
    );
    
})

//Takes in the values that the user submitted for their exercise and inputs it
//into the database. Also alters the experience points and level of the user.
UserController.post("/submitCardio", (req, res) => {

    let id = req.body.id;
    let exerciseName = req.body.exerciseName;
    let sets = 0; 
    let reps = 0;
    let weight = 0;
    let timestamp = Date.now();
    let mins = req.body.mins;
    let speed = req.body.speed;
    
    console.log(req.body);
 
    let state = "INSERT INTO gaintrain.exercises (ID, ExerciseName, Sets, Reps, Weight, Mins, Speed, Timestamp) VALUES (?,?,?,?,?,?,?,?)"
    db.query(state, [id, exerciseName, sets, reps, weight, mins, speed, timestamp],
        (err, results) => {
            if (err) {
                console.log(err);
            }
        }
    );

    let state2 = "SELECT Level, Experience FROM gaintrain.users WHERE ID=?"
    db.query(state2, [id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                var currentxp=result[0].Experience;
                var currentlevel=result[0].Level;

                if(currentxp===9){
                    let newXp=0;
                    let newLevel=currentlevel+1;

                    let state3 = "UPDATE gaintrain.users SET Experience=?, Level=? WHERE ID=?"
                    db.query(state3, [newXp, newLevel, id],
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            }else{
                                res.send(result);
                            } 
                        }
                    );
                }else{
                    let newXp=currentxp+1;

                    let state4 = "UPDATE gaintrain.users SET Experience=? WHERE ID=?"
                    db.query(state4, [newXp, id],
                        (err, result) => {
                            if (err) {
                                console.log(err);
                            }else{
                                res.send(result);
                            } 
                        }
                    );
                }
            }
        }
    );
});

//Returns the data for every instance of a specific 
//non-cardio  exercise for a user in chronological order
UserController.get("/exerciseData", (req, res) => {
    let id = req.query.id;
    let exerciseName = req.query.exerciseName;
    let state = "SELECT Sets, Reps, Weight, Timestamp FROM gaintrain.exercises WHERE ID = ? AND ExerciseName = ? ORDER BY Timestamp ASC;"
    db.query(state, [id, exerciseName], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

//Returns the data for every instance of a specific 
//cardio  exercise for a user in chronological order
UserController.get("/cardioData", (req, res) => {
    //parameters:
    let id = req.query.id;
    let exerciseName = req.query.exerciseName;
    let state = "SELECT Mins, Speed, Timestamp FROM gaintrain.exercises WHERE ID = ? AND ExerciseName = ? ORDER BY Timestamp ASC;"
    db.query(state, [id, exerciseName], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    })
});

// clearing cookies on logout
UserController.post('/Logout', ((req, res) => {
    res.clearCookie('token');
    res.clearCookie('id');
    res.status(200).send();
}));

module.exports = UserController;