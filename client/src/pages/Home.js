import '../components/Home.css';
import * as React from 'react';
import {useEffect, useState} from 'react';
import Axios from 'axios';
import { FormControl, InputLabel, TextField, Select, MenuItem, Grid, Paper, Button } from '@mui/material';
import { Navigate } from "react-router-dom";

function Home() {
    const [xpLevel, setXpLevel] = useState([]);
    let stopEffect = 1;

    useEffect(() => {
        Axios.get("http://localhost:8080/xpLevel", { params: { id: localStorage.getItem("id")} }).then((response) => {
            console.log(response);
            setXpLevel(response.data);
        });
    }, [stopEffect])
    if(localStorage.getItem("id") == null){
        return (
            <div className='HomePage' style={{background: '#FAEBD7'}}>
                <h1>
                    GAINTRAIN: FITNESS APPLICATION
                </h1>
            </div>
        );
    } else {
        return (
            <>
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
}
export default Home;