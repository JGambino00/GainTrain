import * as React from 'react';
import {useState, useEffect} from 'react';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { FormControl, InputLabel, TextField, Select, MenuItem, Grid, Paper, Button } from '@mui/material';
import Axios from 'axios';
import { Navigate } from "react-router-dom";
import Common from "../components/Common";

function ExerciseInput() {

    let exercise = localStorage.getItem("selectedExercise");

    const [xpLevel, setXpLevel] = useState([]);
    let stopEffect = 1;

    useEffect(() => {
        Axios.get("http://localhost:8080/xpLevel", { params: { id: localStorage.getItem("id")} }).then((response) => {
            console.log(response);
            setXpLevel(response.data);
        });
    }, [stopEffect])

    let submitCardio = (event) => { //When clicking the REQUEST SYMPTOM FORM button, this will update the SymptomRequested attribute in the patient tale to true
        console.log(event.currentTarget);
        const data = new FormData(event.currentTarget)
        console.log('hello');
        Axios.post("http://localhost:8080/submitCardio", {
            id: localStorage.getItem("id"), 
            exerciseName: localStorage.getItem("selectedExercise"),
            mins: data.get('Minutes'),
            speed: data.get('Machine Level')
        }).then(() => {
            console.log("success")
        });
    }


    return (
        <>
        {
        localStorage.getItem("id") == null && <Navigate to={"/"} refresh={true} />
        }
            <body>
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

export default ExerciseInput;