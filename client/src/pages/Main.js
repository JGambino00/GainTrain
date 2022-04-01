import * as React from 'react';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { FormControl, InputLabel, TextField, Select, MenuItem, Grid, Paper, Button } from '@mui/material';
import Axios from 'axios';
import { Navigate } from "react-router-dom";
import Common from "../components/Common";

function Main() {

    return (
        <>
            <body>
            <div align="Center">
            <br></br>
            <br></br>
            <br></br>
        
            <Button xs={12} sm={3} sx={{ background: '#ED7014', margin: 1 }} variant="contained" href='/ExerciseSelectLog'>Log Exercises</Button>

            <br></br>
            <br></br>

            <Button xs={12} sm={3} sx={{ background: '#ED7014', margin: 1 }} variant="contained" href='/ExerciseSelectGraph'>Track Progress</Button>

                
            </div>

            </body>
        </>
    );

}

export default Main;