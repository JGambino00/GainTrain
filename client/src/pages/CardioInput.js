import * as React from 'react';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { FormControl, InputLabel, TextField, Select, MenuItem, Grid } from '@mui/material';
import Axios from 'axios';
import { Navigate } from "react-router-dom";
import Common from "../components/Common";

function ExerciseInput() {

    let exercise = localStorage.getItem("selectedExercise");

    return (
        <body>
        <div align="Center">
            <h1 id='change'>{exercise}</h1>
        <FormControl>
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

        </FormControl>
        </div>

        </body>
    );

}

export default ExerciseInput;