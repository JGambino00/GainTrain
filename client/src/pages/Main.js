import * as React from 'react';
import { useEffect, useState } from 'react';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { FormControl, InputLabel, TextField, Select, MenuItem, Grid, Paper, Button } from '@mui/material';
import Axios from 'axios';
import { Navigate } from "react-router-dom";
import Common from "../components/Common";

function Main() {

    let stopEffect = 1;

    useEffect(() => {
        Axios.get("http://localhost:8080/xpLevel", { params: { id: localStorage.getItem("id") } }).then((response) => {
            localStorage.setItem("xp", response.data[0].Experience);
            localStorage.setItem("lev", response.data[0].Level);
            console.log(response.data);
        });
    }, [stopEffect])

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
                    <br></br>
                    <br></br>
                    <br></br>

                    <Button xs={12} sm={3} sx={{ background: '#ED7014', margin: 1 }} variant="contained" href='/ExerciseSelectLog'>Log Exercises</Button>

                    <br></br>
                    <br></br>

                    <Button xs={12} sm={3} sx={{ background: '#ED7014', margin: 1 }} variant="contained" href='/ExerciseSelectGraph'>Track Progress</Button>


                </div>

            </body>
            <br></br>
            <br></br>
            <br></br>
        </>
    );

}

export default Main;