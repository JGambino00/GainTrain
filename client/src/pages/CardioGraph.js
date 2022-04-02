import * as React from 'react';
import { useState, useEffect } from 'react';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { FormControl, InputLabel, TextField, Select, MenuItem, Grid, Button, Paper } from '@mui/material';
import Axios from 'axios';
import { Navigate } from "react-router-dom";
import Common from "../components/Common";

function CardioGraph() {

    const [cardioData, setCardioData] = useState([]);
    let stopEffect = 1;

    useEffect(() => {
        Axios.get("http://localhost:8080/cardioData", { params: { id: localStorage.getItem("id"), exerciseName: localStorage.getItem('selectedExercise') } }).then((response) => {
            console.log(response);
            setCardioData(response.data);
        });

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

            <div align="Right">
                    <p>Lvl.{localStorage.getItem("lev")} {localStorage.getItem("xp")}/10</p>
                </div>
                <div align="Center">

                </div>

            </body>
        </>
    );

}

export default CardioGraph;