import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import BasicModal from './BasicModal';
import Login from './Login';


export default function TemporaryDrawer(props) {

    const [state, setState] = React.useState({
        top: false
    });

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, top: open });
    };


    const list = () => (
        <Box
            sx={{ width: 'auto', paddingTop: 5, paddingLeft: 5, fontSize: '20px' }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List className='drawer_list'>
                <Link to="/Shop">Shop</Link>
                <Link to="/ShopCart">Shop Cart</Link>
                <Link to="/">Home</Link>
                {props.admin ? <Link to="/ProductsManger">Products edit/delete</Link> : null}
            </List>
        </Box>
    );
    return (
        <div>
            <React.Fragment key={'top'}>
                <Button style={{ color: "white" }} onClick={toggleDrawer(true)}><MenuIcon /></Button>
                <Drawer
                    anchor={'top'}
                    open={state['top']}
                    onClose={toggleDrawer(false)}
                >
                    {list()}
                </Drawer>
            </React.Fragment>

        </div>
    );
}
