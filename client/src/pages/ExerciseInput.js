import * as React from 'react';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { FormControl, InputLabel, TextField, Select, MenuItem, Grid, Button, Paper } from '@mui/material';
import Axios from 'axios';
import { Navigate } from "react-router-dom";
import Common from "../components/Common";

function ExerciseInput() {

    let exercise = localStorage.getItem("selectedExercise");

    let submitExercise = (event) => { //When clicking the REQUEST SYMPTOM FORM button, this will update the SymptomRequested attribute in the patient tale to true
        console.log(event.currentTarget);
        const data = new FormData(event.currentTarget)
        console.log('hello');
        Axios.post("http://localhost:8080/submitExercise", {
            id: localStorage.getItem("id"), 
            exerciseName: localStorage.getItem("selectedExercise"),
            sets: data.get('Sets'),
            reps: data.get('Reps'),
            weight: data.get('Weight')
        }).then(() => {
            console.log("success")
        });
    }

    return (
        <>
            <body>
            <div align="Center">
                <h1 id='change'>{exercise}</h1>
            <Paper elevation={0} component="form" onSubmit={submitExercise}>
                <FormControl onSubmit={submitExercise}>
                    <TextField
                        id="outlined-number"
                        label="Sets"
                        type="number"
                        name='Sets'
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <br></br>
                    <br></br>

                    <TextField
                        id="outlined-number"
                        label="Reps"
                        type="number"
                        name='Reps'
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <br></br>
                    <br></br>
                    
                    <TextField
                        id="outlined-number"
                        label="Weight"
                        type="number"
                        name='Weight'
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