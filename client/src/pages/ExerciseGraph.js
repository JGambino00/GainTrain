import * as React from 'react';
import {useState, useEffect} from 'react';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { FormControl, InputLabel, TextField, Select, MenuItem, Grid, Button, Paper } from '@mui/material';
import Axios from 'axios';
import { Navigate } from "react-router-dom";
import Common from "../components/Common";

function ExerciseGraph() {



    const [exerciseData, setExerciseData] = useState([]);
    let stopEffect = 1;

    useEffect(() => {
        Axios.get("http://localhost:8080/exerciseData", { params: { id: localStorage.getItem("id"), exerciseName: localStorage.getItem('selectedExercise') } }).then((response) => {
            console.log(response);
            setExerciseData(response.data);
        });
    }, [stopEffect]);

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