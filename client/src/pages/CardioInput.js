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

    useEffect(() => {
        Axios.get("http://localhost:8080/xpLevel", { params: { id: localStorage.getItem("id") } }).then((response) => {
            localStorage.setItem("xp", response.data[0].Experience);
            localStorage.setItem("lev", response.data[0].Level);
            console.log(response.data);
        });
    }, [stopEffect])


    let submitCardio = (event) => {
        console.log(event.currentTarget);
        const data = new FormData(event.currentTarget)
        console.log('hello');
        Axios.post("http://localhost:8080/submitCardio", {
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
            <div align="Right">
                    <p>Lvl.{localStorage.getItem("lev")} {localStorage.getItem("xp")}/10</p>
                </div>
                <div align="Center">
                    <h1 id='change'>{exercise}</h1>
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

                        </FormControl>
                    </Paper>
                </div>

            </body>
        </>
    );

}

export default CardioInput;