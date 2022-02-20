import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useReducer } from 'react';
import TemporaryDrawer from './Drawer';
import Login from './Login';
import BasicModal from './BasicModal';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import Register from './Register';
import { Navigate, useNavigate } from 'react-router-dom'
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import PersonIcon from '@mui/icons-material/Person';


export default function ButtonAppBar(props) {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false)


    const navigate = useNavigate()

    const setAdminLog = (log) => {
        props.setAdminLog(log)
    }

    const setUserLog = (log) => {
        props.setUserLog(log)
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={() => setDrawerIsOpen(true)}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 0 }}
                    >
                        <TemporaryDrawer admin={props.admin} />
                    </IconButton>

                    <div style={{ marginRight: '60px' }} >
                        <BasicModal text={'Register'} comp={'logOut'} />
                    </div>

                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        NewsBa
                    </Typography>

                    <div style={{ marginRight: '40px' }}>
                        <HiOutlineShoppingCart size={'30px'} />
                        {props.productAmount}
                    </div>
                    <PersonIcon onClick={() => { if (props.user) navigate('/UserPage') }} style={{ marginRight: '20px' }} />
                    {props.user === false && props.admin === false ? <BasicModal text={'Login'} comp={'login'} setUserLog={() => setUserLog(true)} setAdmin={() => setAdminLog(true)} /> :
                        <Button style={{ marginRight: '20px', textTransform: 'none', fontSize: '18px' }} color="inherit" onClick={props.admin ? () => setAdminLog(false) : () => setUserLog(false)}>Log out</Button>}
                </Toolbar>
            </AppBar>
        </Box >
    );
}
