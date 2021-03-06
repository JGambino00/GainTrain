import * as React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import { Navigate } from "react-router-dom";
import { Button, Paper } from '@mui/material';
import { Chart, ArgumentAxis, ValueAxis, LineSeries, Title } from '@devexpress/dx-react-chart-material-ui';

function CardioGraph() {

    const [cardioData, setCardioData] = useState([]);
    let stopEffect = 1; //Allows use effect to only run once when a page is loaded

    //Every time this page is loaded, we will be getting information for the exercise that was selected using
    //the cardioData API call. We will also get the experience and level of the user using the xpLevel API call.
    useEffect(() => {
        Axios.get("http://localhost:8080/cardioData", { params: { id: localStorage.getItem("id"), exerciseName: localStorage.getItem('selectedExercise') } }).then((response) => {
            console.log(response);
            setCardioData(response.data);
        });
        //the xplevel API call is done everytime the page is loaded to update any change in level or experience for the user
        Axios.get("http://localhost:8080/xpLevel", { params: { id: localStorage.getItem("id") } }).then((response) => {
            localStorage.setItem("xp", response.data[0].Experience);
            localStorage.setItem("lev", response.data[0].Level);
            console.log(response.data);
        });

    }, [stopEffect])

    let minsData = [];
    let speedData = [];

    //This for loop fills up 2 arrays with the information that 
    //will be necessary for our graphs.
    for (let i = 0; i < cardioData.length; i++) {
        minsData[i] = { mins: cardioData[i].Mins, time: i }
        speedData[i] = { speed: cardioData[i].Speed, time: i}
    }

    const format = () => tick => tick;

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
                        {/*
                        Below, we can find how the charts are made for both the minutes and speed progress of the users. Note: time is always the argument field (x value)
                        */}
                        <Chart data={minsData}>
                            <Title text={`Minutes Progress`} />
                            <ArgumentAxis />
                            <ValueAxis />
                            <LineSeries valueField='mins' argumentField='time' />
                        </Chart>

                        <br></br>
                        <br></br>

                        <Chart data={speedData}>
                            <Title text={`Speed Progress`} />
                            <ArgumentAxis />
                            <ValueAxis />
                            <LineSeries valueField='speed' argumentField='time' />
                        </Chart>
                    </Paper>

                    <br></br>
                    <br></br>

                        <Button xs={12} sm={3} sx={{ background: '#ED7014', margin: 1 }} href='/ExerciseSelectGraph' variant="contained">Back</Button>

                </div>

            </body>
            <br></br>
            <br></br>
            <br></br>
        </>
    );

}

export default CardioGraph;