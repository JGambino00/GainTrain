import * as React from 'react';
import {useEffect, useState} from 'react';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { FormControl, InputLabel, TextField, Select, MenuItem, Grid, Paper, Button } from '@mui/material';
import Axios from 'axios';
import { Navigate } from "react-router-dom";
import Common from "../components/Common";

function Main() {

    const [xpLevel, setXpLevel] = useState([]);
    let stopEffect = 1;

    useEffect(() => {
        Axios.get("http://localhost:8080/xpLevel", { params: { id: localStorage.getItem("id")} }).then((response) => {
            console.log(response);
            setXpLevel(response.data);
        });
    }, [stopEffect])

    return (
        <>
        {
        localStorage.getItem("id") == null && <Navigate to={"/"} refresh={true} />
        }
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