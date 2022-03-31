import Login from './pages/Login.js';
import Signup from './pages/Signup.js';
import ExerciseSelectLog from './pages/ExerciseSelectLog';
import CssBaseline from '@mui/material/CssBaseline';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer.js';
import Navbar from './components/Navbar.js';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from './pages/Home';

import Cookies from 'js-cookie';
import Common from './components/Common'

function App() {

    // on correct authentication check (logged in) set role and id in localstorage (non-sensitive data)
    function checkAuth() {
        return new Promise(((resolve, reject) => {
            axios.get(
                "http://localhost:8080/checkAuth", { withCredentials: true }).then(res => {
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
                </Routes>
            </Common.Provider>
            <Footer />
        </div>
    );
}

export default App;
