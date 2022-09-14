import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import axios from 'axios';
import { API } from '../config';

import slugify from 'react-slugify';


import './style.css'
import { useNavigate } from 'react-router-dom';
import { Grid, Link } from '@mui/material';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const ResponsiveAppBar = () => {

    const navigate = useNavigate()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const [fixed, setfixed] = React.useState([])
    const [dropdown, setdropdown] = React.useState([])


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

    const redirectpage = (text) => {

        const url = slugify(text.name)
        navigate(`/${url}`)
    }



    React.useEffect(() => {
        axios.get(API + 'navbar/get').then(res => {
            const result = res.data.result[0]
            console.log(result)
            setfixed(result.fixed)
            setdropdown(result.dropdown)
        })
    }, [])

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#ffffff' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />


                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon sx={{ color: '#000000' }} />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {fixed.map((page) => (
                                // <Link href={`/${slugify(page.name)}`}>{page.name}</Link>
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Link underline='none' style={{ fontSize: '20px', fontWeight: 500 ,color: '#000000',}} href={`/${slugify(page.name)}`}>{page.name}</Link>
                                    {/* <Typography sx={{ color: '#000000', fontSize: '20px' }} textAlign="center">{page.name}</Typography> */}
                                </MenuItem>
                            ))}


                            {dropdown.map((item, key) => (

                                <>
                                    <div>
                                        <div class="navigation">
                                            <Link style={{ fontSize: '20px', fontWeight: 600 }} href="#">{item.name}</Link>
                                            <div class="navigation-content">
                                                {item.selectedvalue.map(item1 => (

                                                    <Link href={`/${item1.slug}`}>{item1.name}</Link>
                                                ))}
                                            </div>

                                        </div>
                                    </div>

                                </>


                            ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'flex' },
                            fontWeight: 9000,
                            letterSpacing: '.2rem',
                            color: '#DB4437',

                            textDecoration: 'none',

                        }}
                    >
                        As Rao
                    </Typography>







                    <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
                        {fixed.map((page) => (
                            // <Button

                            //     key={page}
                            //     onClick={() => redirectpage(page)}
                            //     sx={{ fontSize: '20px', my: 2, color: '#000000', display: 'block', textTransform: 'none' }}
                            // >
                            //     {page.name}
                            // </Button>

<Link  sx={{ padding:'6px', fontWeight:500, fontSize: '20px', my: 2, color: '#000000', display: 'block', textTransform: 'none' }}  underline='none' href={`/${slugify(page.name)}`}>{page.name}</Link>
                        ))}

                        {dropdown.map((item, key) => (

                            <>
                                <div>
                                    <div class="navigation">
                                        <Link style={{ fontSize: '20px', fontWeight: 600 }} href="#">{item.name}</Link>
                                        <div class="navigation-content">
                                            {item.selectedvalue.map(item1 => (

                                                <Link href={`/${item1.slug}`}>{item1.name}</Link>
                                            ))}
                                        </div>

                                    </div>
                                </div>

                            </>


                        ))}
                    </Box>


                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default ResponsiveAppBar;
