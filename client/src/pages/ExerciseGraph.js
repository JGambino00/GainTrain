import * as React from 'react';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { FormControl, InputLabel, TextField, Select, MenuItem, Grid, Button, Paper } from '@mui/material';
import Axios from 'axios';
import { Navigate } from "react-router-dom";
import Common from "../components/Common";

function ExerciseGraph() {

    let exercise = localStorage.getItem("selectedExercise");

    let exerciseData = () => { //This function gets the list of all the patients previous symptom forms (to be rendered on a page in later sprint)
        Axios.get("http://localhost:8080/exerciseData", { params: { id: localStorage.getItem("id"), exerciseName: localStorage.getItem('selectedExercise') } }).then((response) => {
            console.log("success");
        });
    }

    return (
        <>
            <body>
            <div align="Center">
            
            </div>

            </body>
        </>
    );

}

export default ExerciseGraph;