import * as React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { Container, Box, Button, AppBar, Toolbar, IconButton, Typography, Menu, Avatar, Tooltip, MenuItem, Badge, Link, Text } from '@mui/material';
import axios from "axios";
import { useEffect } from "react";
import Cookies from 'js-cookie';
import Axios from "axios";
import Common from "./Common";
import Login from "../pages/Login";

let pages = [];

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [pagesTest, setPagesTest] = React.useState([]);
    const [xpLevel, setXpLevel] = React.useState([]);
    var [count, setCount] = React.useState(); //number of notifications set as count

    let test = 1;

    //Handles all the possiblity for the menu
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    // instantiate navbar differently depending on correct role
    function instantiateNavBar() {
        {
            setPagesTest(pages);
            //This will show the appropriate page based on who is logged in
            if (localStorage.getItem('role') == null) {
                pages.push(['Login', 'Login']);
                pages.push(['Signup', 'Signup'])
            }
            
            if (localStorage.getItem('role') != null) {
                pages.push(['Main', 'Main']);
                pages.push(['Logout', 'Logout']);
            }
        }
    }

    function logout() {
        //Clears the local storage which contains all the user's information
        Axios.post('http://localhost:8080/Logout', {}, { withCredentials: true }).then(() => {
            localStorage.clear();
            return new Promise(((resolve, reject) => {
                axios.get(
                    "http://localhost:8080/checkAuth", { withCredentials: true }).catch(err => {
                        window.location.reload();
                    })
            }))


        });
    }

    function getXpLevel() {
        Axios.get("http://localhost:8080/xpLevel", { params: { id: localStorage.getItem("id")} }).then((response) => {
            console.log(response);
            setXpLevel(response.data);
        });
    }
    // these  functions are called when navbar is rendered
    useEffect(() => {
        instantiateNavBar();
        getXpLevel();
    }, [])


    return (
        <AppBar style={{ background: '#ED7014' }} position="sticky">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Button variant="h6" noWrap component="div" href='/' sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }} >
                        <Link href='/' sx={{ color: 'white', textDecoration: 'none' }}>
                            <Typography component="h1" variant="h5">
                                GainTrain
                            </Typography>
                        </Link>
                    </Button>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar"
                            aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                            <MenuIcon />
                        </IconButton>
                        <Menu id="menu-appbar" anchorEl={anchorElNav}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} keepMounted
                            transformOrigin={{ vertical: 'top', horizontal: 'left', }}
                            open={Boolean(anchorElNav)} onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'block', md: 'none' }, }}>
                            {/* Displays menu bar in small screen format */}
                            {pages.map((page) => (
                                 page[0] === 'Logout' ?
                                 <Button key={page[0]} onClick={logout} sx={{ my: 2, color: 'primary', display: 'block' }}>
                                     {page[1]}
                                 </Button> :
                                 <Button key={page[0]} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'primary', display: 'block' }} href={`/${page[0]}`}>
                                     {page[1]}
                                 </Button>
                            ))}
                        </Menu>

                    </Box>
                    <Link href='/' sx={{ color: 'white', textdecoration: 'none', flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        GainTrain
                    </Link>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {/* displays proper page based on if the page is Logout */}
                        {pages.map((page) => (
                            page[0] === 'Logout' ?
                                <Button key={page[0]} onClick={logout} sx={{ my: 2, color: 'white', display: 'block' }}>
                                    {page[1]}
                                </Button> :
                                <Button key={page[0]} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }} href={`/${page[0]}`}>
                                    {page[1]}
                                </Button>
                        ))}
                        
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

ResponsiveAppBar.contextType = Common;

export default ResponsiveAppBar;
