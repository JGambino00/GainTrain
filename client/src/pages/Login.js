import * as React from 'react';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';
import { Container, Typography, Box, Grid, Link, Checkbox, FormControlLabel, TextField, CssBaseline, Button, Avatar } from '@mui/material';
import Axios from 'axios';
import { Component } from "react";
import { Navigate } from "react-router-dom";
import Common from "../components/Common";


//handling the login form
class Login extends Component {

    static contextType = Common;

    constructor(props, context) {
        super(props, context);
        this.state = {
            email: "",
            wrongCredentials: "",
            unvalidated: ""
        };


    }

    //On login remove errors. if errors set errors. If not login and reload page. Will be redirected in render.
    onLogin() {
        this.setState({ unvalidated: '' })
        this.setState({ wrongCredentials: '' })
        Axios.post('http://localhost:8080/Login', {
            email: this.state.email
        }, { withCredentials: true }).then(() => {
            //If the login credentials are valid, the user will be logged in
            return new Promise(((resolve, reject) => {
                this.context.checkAuth().then(res => {
                    resolve(res.data);
                    window.location.reload();
                }
                ).catch(err => {
                    console.log(err)
                    reject(null);
                })
            }))

        }).catch((err => {
            console.log(err);
        }));
    }

    render() {

        return (
            <>
                {/* If the user is logged in, they will be redirected to the main page */}
                {
                    localStorage.getItem("role") && <Navigate to={"/"} refresh={true} />
                }
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                        <Avatar sx={{ m: 1, bgcolor: '#ED7014' }}>
                            <LockOpenTwoToneIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                            {/* Getting the email from user */}
                            <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email"
                                autoComplete="email" value={this.state.email}
                                onChange={(ev) => this.setState({ email: ev.target.value })} autoFocus />
                            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                            <Button type="submit" fullWidth variant="contained" onClick={() => this.onLogin()} sx={{ background: '#ED7014', mt: 3, mb: 2 }}>
                                Sign In
                            </Button>
                            {/* Displays appropriate error message based status send from server */}
                            {this.state.wrongCredentials && this.state.wrongCredentials}
                            <Grid container>
                                <Grid item>
                                    <Link href="/Signup" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
                <br></br>
                <br></br>
                <br></br>
            </>
        );
    }
}
Login.contextType = Common;
;
export default Login;