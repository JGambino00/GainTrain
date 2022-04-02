import * as React from 'react';
import { useState, useEffect } from 'react';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { FormControl, InputLabel, TextField, Select, MenuItem, Grid, Button, Paper } from '@mui/material';
import { Chart, ArgumentAxis, ValueAxis, LineSeries, Title, Legend, } from '@devexpress/dx-react-chart-material-ui';
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

        Axios.get("http://localhost:8080/xpLevel", { params: { id: localStorage.getItem("id") } }).then((response) => {
            localStorage.setItem("xp", response.data[0].Experience);
            localStorage.setItem("lev", response.data[0].Level);
            console.log(response.data);

        });
    }, [stopEffect]);

    let setRep = [];
    let totalReps = [];
    let weightData = [];
    let index = 0;

    exerciseData.map(el => setRep.push([el.Sets, el.Reps]))
    
    for (let i = 0; i < setRep.length; i++) {
        //totalReps[i] = { totReps: setRep[i][0] * setRep[i][1], time: exerciseData[i].Timestamp }
        totalReps[i] = { totReps: setRep[i][0] * setRep[i][1], time: i }
        weightData[i] = { weight: exerciseData[i].Weight, time: i}
    }

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
                    <h1>{localStorage.getItem('selectedExercise')}</h1>
                    <Paper>
                        <br></br>
                        <br></br>

                        <Chart data={weightData}>
                            <Title text={`Weight Progress`} />
                            <ArgumentAxis />
                            <ValueAxis />
                            <LineSeries valueField='weight' argumentField='time' />
                        </Chart>

                        <br></br>
                        <br></br>

                        <Chart data={totalReps}>
                            <Title text={`Rep Progress`} />
                            <ArgumentAxis />
                            <ValueAxis />
                            <LineSeries valueField='totReps' argumentField='time' />
                        </Chart>
                    </Paper>
                </div>

            </body>
            <br></br>
            <br></br>
            <br></br>
        </>
    );

}

export default ExerciseGraph;