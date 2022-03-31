import * as React from 'react';
import { useState } from 'react';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { Container, Typography, Box, Grid, Link, Checkbox, FormControlLabel, TextField, CssBaseline, Button, Avatar, MenuItem, stepConnectorClasses } from '@mui/material'
import Axios from 'axios';
import validator from 'validator';
import { Navigate } from "react-router-dom";

function Signup() {
  // signing up -> if correct send to login page -> if not  display error
  let submitSignupForm = (event1) => {
    event1.preventDefault();
    const data = new FormData(event1.currentTarget);
    if (validator.isEmail(data.get('email'))) {
      Axios.post('http://localhost:8080/Signup', {
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email')
      }, { withCredentials: true }).then(() => {

        window.location.href = "/Login"
      }).catch(() => setEmailExisting('Your email already exists!'));
    }


  };
 
  // remove error message after new submit
  const submit = () => {
    setEmailExisting('')
  };

  //validating email
  const [emailError, setEmailError] = useState('');
  const validateEmail = (e) => {
    var email = e.target.value;

    if (validator.isEmail(email)) {
      setEmailError('');
    } else {
      setEmailError('Enter valid Email!');
    }
  };

  const [emailExisting, setEmailExisting] = useState('');
  return (

    <>
      {
        localStorage.getItem("role") && <Navigate to={"/"} refresh={true} />
      }

      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <Avatar sx={{ m: 1, bgcolor: '#ED7014' }}>
            <LockOpenTwoToneIcon />
          </Avatar>
          {/* Displays the sign up form */}
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={submitSignupForm} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {/* Taking input from user */}
              <Grid item xs={12} sm={6}>
                <TextField autoComplete="given-name" name="firstName" required fullWidth id="firstName" label="First Name" autoFocus />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required fullWidth id="lastName" label="Last Name" name="lastName" autoComplete="family-name" />
              </Grid>
              <Grid item xs={12}>
                <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" onChange={(e) => validateEmail(e)} />
                {emailError}
              </Grid>
            </Grid>
            {/* Burron for submit */}
            <div onClick={submit}> 
              <Button type="submit" fullWidth variant="contained" sx={{ background: '#ED7014', mt: 3, mb: 2 }}>
                Sign Up
              </Button>
            </div>
            {/* Checks to see if the email exists */}
            {emailExisting && emailExisting}

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container> 
    </>
  );
}

export default Signup;
