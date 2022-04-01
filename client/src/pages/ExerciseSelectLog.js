import * as React from 'react';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { FormControl, InputLabel, Select, MenuItem, Grid } from '@mui/material';
import Axios from 'axios';
import { Navigate } from "react-router-dom";
import Common from "../components/Common";

function ExerciseSelectLog() {

    let handleChange = (event) => {
        localStorage.setItem("selectedExercise", event.target.value);
        window.location = "/ExerciseInput";
    }

    let handleChangeCardio = (event) => {
        localStorage.setItem("selectedExercise", event.target.value);
        window.location = "/CardioInput";
    }

    return (
        <body>
            <div align="Center">
                <h1>Select an Exercise to Log:</h1>
                <FormControl style={{ minWidth: 250 }}>
                    <InputLabel id="demo-simple-select-label">Biceps</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        label="Biceps"
                        onChange={handleChange}
                    >
                        <MenuItem value="Dumbell Curl" name="Dumbell Curl">Dumbell Curl</MenuItem>
                        <MenuItem value="Barbell Curl" name="Barbell Curl">Barbell Curl</MenuItem>
                        <MenuItem value="Preacher Curl" name="Preacher Curl">Preacher Curl</MenuItem>
                        <MenuItem value="Cable Curl" name="Cable Curl">Cable Curl</MenuItem>
                        <MenuItem value="Hammer Curl" name="Hammer Curl">Hammer Curl</MenuItem>
                        <MenuItem value="Chin Up" name="Chin Up">Chin Up</MenuItem>
                    </Select>
                </FormControl>

                <br></br>
                <br></br>

                <FormControl style={{ minWidth: 250 }}>
                    <InputLabel id="Triceps">Triceps</InputLabel>
                    <Select
                        labelId="Triceps"
                        id="demo-simple-select"
                        // value={age}
                        label="Triceps"
                        onChange={handleChange}
                    >
                        <MenuItem value="Skullcrushers" name="Skullcrushers">Skullcrushers</MenuItem>
                        <MenuItem value="Tricep Pulldowns" name="Tricep Pulldowns">Tricep Pulldowns</MenuItem>
                        <MenuItem value="Tricep Kickbacks" name="Tricep Kickbacks">Tricep Kickbacks</MenuItem>
                        <MenuItem value="Close Grip Bench Press" name="Close Grip Bench Press">Close Grip Bench Press</MenuItem>
                        <MenuItem value="Dips" name="Dips">Dips</MenuItem>
                        <MenuItem value="Overhead Tricep Extensions" name="Overhead Tricep Extensions">Overhead Tricep Extensions</MenuItem>
                    </Select>
                </FormControl>
                
                <br></br>
                <br></br>

                <FormControl style={{ minWidth: 250 }}>
                    <InputLabel id="Shoulders">Shoulders</InputLabel>
                    <Select
                        labelId="Shoulder"
                        id="demo-simple-select"
                        // value={age}
                        label="Shoulders"
                        onChange={handleChange}
                    >
                        <MenuItem value="Barbell Press" name="Barbell Press">Barbell Press</MenuItem>
                        <MenuItem value="Dumbbell Press" name="Dumbbell Press">Dumbbell Press</MenuItem>
                        <MenuItem value="Lateral Raise" name="Lateral Raise">Lateral Raise</MenuItem>
                        <MenuItem value="Landmine Press" name="Landmine Press">Landmine Press</MenuItem>
                        <MenuItem value="Front Raise" name="Front Raise">Front Raise</MenuItem>
                        <MenuItem value="Cable Lateral Raise" name="Cable Lateral Raise">Cable Lateral Raise</MenuItem>
                        <MenuItem value="Shrugs" name="Shrugs">Shrugs</MenuItem>
                        <MenuItem value="Reverse Cable Crossover" name="Reverse Cable Crossover">Reverse Cable Crossover</MenuItem>
                    </Select>
                </FormControl>

                <br></br>
                <br></br>

                <FormControl style={{ minWidth: 250 }}>
                    <InputLabel id="Legs">Legs</InputLabel>
                    <Select
                        labelId="Legs"
                        id="demo-simple-select"
                        // value={age}
                        label="Legs"
                        onChange={handleChange}
                    >
                        <MenuItem value="Squat" name="Squat">Squat</MenuItem>
                        <MenuItem value="Lunge" name="Lunge">Lunge</MenuItem>
                        <MenuItem value="Bulgarian Split Squat" name="Bulgarian Split Squat">Bulgarian Split Squat</MenuItem>
                        <MenuItem value="Leg Press" name="Leg Press">Leg Press</MenuItem>
                        <MenuItem value="Calf Raises" name="Calf Raises">Calf Raises</MenuItem>
                        <MenuItem value="Hamstring Curls" name="Hamstring Curls">Hamstring Curls</MenuItem>
                        <MenuItem value="Quad Extensions" name="Quad Extensions">Quad Extensions</MenuItem>
                        <MenuItem value="Goblet Squats" name="Goblet Squats">Goblet Squats</MenuItem>
                        <MenuItem value="Romanian Deadlift" name="Romanian Deadlift">Romanian Deadlift</MenuItem>
                        <MenuItem value="Hip Thrust" name="Hip Thrust">Hip Thrust</MenuItem>
                        <MenuItem value="Donkey Kicks" name="Donkey Kicks">Donkey Kicks</MenuItem>
                    </Select>
                </FormControl>

                <br></br>
                <br></br>

                <FormControl style={{ minWidth: 250 }}>
                    <InputLabel id="Chest">Chest</InputLabel>
                    <Select
                        labelId="Chest"
                        id="demo-simple-select"
                        // value={age}
                        label="Chest"
                        onChange={handleChange}
                    >
                        <MenuItem value="Dumbbell Bench Press" name="Dumbbell Bench Press">Dumbbell Bench Press</MenuItem>
                        <MenuItem value="Barbell Bench Press" name="Barbell Bench Press">Barbell Bench Press</MenuItem>
                        <MenuItem value="Pushup" name="Pushup">Pushup</MenuItem>
                        <MenuItem value="Cable Crossover" name="Cable Crossover">Cable Crossover</MenuItem>
                        <MenuItem value="Chest Dip" name="Chest Dip">Chest Dip</MenuItem>
                        <MenuItem value="Incline Press" name="Incline Press">Incline Press</MenuItem>
                        <MenuItem value="Decline Press" name="Decline Press">Decline Press</MenuItem>
                        <MenuItem value="Dumbell Flye" name="Dumbell Flye">Dumbell Flye</MenuItem>
                        <MenuItem value="Cable Flye" name="Cable Flye">Cable Flye</MenuItem>
                        <MenuItem value="Low Cable Crossover" name="Low Cable Crossover">Low Cable Crossover</MenuItem>
                    </Select>
                </FormControl>

                <br></br>
                <br></br>

                <FormControl style={{ minWidth: 250 }}>
                    <InputLabel id="Back">Back</InputLabel>
                    <Select
                        labelId="Back"
                        id="demo-simple-select"
                        // value={age}
                        label="Back"
                        onChange={handleChange}
                    >
                        <MenuItem value="Pullups" name="Pullups">Pullups</MenuItem>
                        <MenuItem value="Lat Pulldown" name="Lat Pulldown">Lat Pulldown</MenuItem>
                        <MenuItem value="Suspended Row" name="Suspended Row">Suspended Row</MenuItem>
                        <MenuItem value="Bent Over Row" name="Bent Over Row">Bent Over Rowl</MenuItem>
                        <MenuItem value="Dumbbell Row" name="Dumbbell Row">Dumbbell Row</MenuItem>
                        <MenuItem value="Deadlift" name="Deadlift">Deadlift</MenuItem>
                        <MenuItem value="Reverse Flye" name="Reverse Flye">Reverse Flye</MenuItem>
                    </Select>
                </FormControl>

                <br></br>
                <br></br>

                <FormControl style={{ minWidth: 250 }}>
                    <InputLabel id="Abs">Abs</InputLabel>
                    <Select
                        labelId="Abs"
                        id="demo-simple-select"
                        // value={age}
                        label="Abs"
                        onChange={handleChange}
                    >
                        <MenuItem value="Situps" name="Situps">Situps</MenuItem>
                        <MenuItem value="Crunches" name="Crunches">Crunches</MenuItem>
                        <MenuItem value="Mountain Climbers" name="Mountain Climbers">Mountain Climbers</MenuItem>
                    </Select>
                </FormControl>

                <br></br>
                <br></br>
                
                <FormControl style={{ minWidth: 250 }}>
                    <InputLabel id="Cardio">Cardio</InputLabel>
                    <Select
                        labelId="Cardio"
                        id="demo-simple-select"
                        // value={age}
                        label="Cardio"
                        onChange={handleChangeCardio}
                    >
                        <MenuItem value="Treadmill" name="Treadmill" href="/Signup.js">Treadmill</MenuItem>
                        <MenuItem value="Elliptical" name="Elliptical">Elliptical</MenuItem>
                        <MenuItem value="Rowing" name="Rowing">Rowing</MenuItem>
                        <MenuItem value="Spinning" name="Spinning">Spinning</MenuItem>
                        <MenuItem value="Stair Climber" name="Stair Climber">Stair Climber</MenuItem>
                    </Select>
                </FormControl>


            </div>
        </body >

    );

}

export default ExerciseSelectLog;