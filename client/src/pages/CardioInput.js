import * as React from 'react';
import { useState, useEffect } from 'react';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { FormControl, InputLabel, TextField, Select, MenuItem, Grid, Paper, Button } from '@mui/material';
import Axios from 'axios';
import { Navigate } from "react-router-dom";
import Common from "../components/Common";

function CardioInput() {

    let exercise = localStorage.getItem("selectedExercise");

    let stopEffect = 1;

    //Every time the page is loaded, we will get the experience and level of the user so 
    //that it can be displayed.
    useEffect(() => {
        Axios.get("https://primal-graph-346315.nn.r.appspot.com/xpLevel", { params: { id: localStorage.getItem("id") } }).then((response) => {
            localStorage.setItem("xp", response.data[0].Experience);
            localStorage.setItem("lev", response.data[0].Level);
            console.log(response.data);
        });
    }, [stopEffect])

    //When the user submits the values for their exercise, this method will run a post
    //so that it can be put into the database.
    let submitCardio = (event) => {
        console.log(event.currentTarget);
        const data = new FormData(event.currentTarget)
        console.log('hello');
        Axios.post("https://primal-graph-346315.nn.r.appspot.com/submitCardio", {
            id: localStorage.getItem("id"),
            exerciseName: localStorage.getItem("selectedExercise"),
            mins: data.get('Minutes'),
            speed: data.get('Machine Level')
        }).then((result) => {
            window.location = "/ExerciseSelectLog";
        }).catch((err) => {
            console.log(err);
            window.location = "/ExerciseSelectLog";
        });
    }


    return (
        <>
            {
                localStorage.getItem("id") == null && <Navigate to={"/"} refresh={true} />
            }
            <body>
            <div align="Right" style={{marginRight: 25, paddingRight: 25}}>
                    <p>Lvl.{localStorage.getItem("lev")} {localStorage.getItem("xp")}/10</p>
                </div>
                <div align="Center">
                    <h1 id='change'>{exercise}</h1>

                    {/*
                    Below, we can see all the different fields that the user can fill to describe the exercise that they performed.
                    */}
                    <Paper elevation={0} component="form" onSubmit={submitCardio}>
                        <FormControl onSubmit={submitCardio}>
                            <TextField
                                id="outlined-number"
                                label="Machine Level"
                                type="number"
                                name='Machine Level'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            <br></br>
                            <br></br>

                            <TextField
                                id="outlined-number"
                                label="Minutes"
                                type="number"
                                name='Minutes'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />

                            <br></br>

                            <Button xs={12} sm={3} sx={{ background: '#ED7014', margin: 1 }} type="submit" variant="contained">Submit</Button>
                            <Button xs={12} sm={3} sx={{ background: '#ED7014', margin: 1 }} href='/ExerciseSelectLog' variant="contained">Back</Button>

                        </FormControl>
                    </Paper>
                </div>

            </body>
            <br></br>
            <br></br>
            <br></br>
        </>
    );

}

export default CardioInput;