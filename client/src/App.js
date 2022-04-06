import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import ExerciseSelectLog from './pages/ExerciseSelectLog';
import ExerciseSelectGraph from './pages/ExerciseSelectGraph';
import ExerciseInput from './pages/ExerciseInput';
import CardioInput from './pages/CardioInput';
import CardioGraph from './pages/CardioGraph';
import ExerciseGraph from './pages/ExerciseGraph.js';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer.js';
import Navbar from './components/Navbar.js';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './pages/Home';
import Main from './pages/Main';

import Cookies from 'js-cookie';
import Common from './components/Common'

function App() {

    // On correct authentication check (logged in) set role and id in localstorage (non-sensitive data)
    function checkAuth() {
        return new Promise(((resolve, reject) => {
            axios.get(
                "https://primal-graph-346315.nn.r.appspot.com/checkAuth", { withCredentials: true }).then(res => {
                    localStorage.setItem("role", res.data.role)
                    localStorage.setItem("id", res.data.id)
                    resolve(res.data);
                }
                ).catch(err => {
                    console.log(err)
                })
        }))
    };

    useEffect(() => {
        checkAuth();
    }, []);
    
    return (
        <div className="App">
            <CssBaseline />
            <Common.Provider value={{ checkAuth }}>
                <Navbar />
                {/* Linking url paths to proper React components */}
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} checkAuth={checkAuth()} />
                    <Route path='/Signup' element={<Signup />} />
                    <Route path='/ExerciseSelectLog' element={<ExerciseSelectLog/>} />
                    <Route path='/ExerciseSelectGraph' element={<ExerciseSelectGraph/>} />
                    <Route path='/ExerciseInput' element={<ExerciseInput/>} />
                    <Route path='/CardioInput' element={<CardioInput/>} />
                    <Route path='/CardioGraph' element={<CardioGraph/>} />
                    <Route path='/ExerciseGraph' element={<ExerciseGraph/>} />
                    <Route path='/Main' element={<Main/>} />
                    
                </Routes>
            </Common.Provider>
            <Footer />
        </div>
    );
}

export default App;
