import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Login from './Login';
import Register from './Register'
import ProductImg from './ProductImg';
import Edit from './Edit';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 6,

};

export default function BasicModal(props) {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const setAdmin = () => {
        props.setAdmin()
    }

    const setUserLog = () => {
        props.setUserLog()
    }

    let componnent = props.comp === 'login' ? <Login handleClose={handleClose} setUserLog={setUserLog} setAdmin={setAdmin} /> :
        props.comp === 'logOut' ? <Register handleClose={handleClose} /> :
            props.comp === 'productImg' ? <ProductImg cat={props.product.cat} src={props.product.img} /> :
                props.comp === 'edit' ? <Edit handleClose={handleClose} setUser={props.setUser} /> : <p>{props.desc}</p>



    return (
        <div>
            <Button
                style={{ textTransform: 'none', fontSize: '18px' }} variant={props.comp === 'edit' ? "contained" : "text"}
                color={props.comp === 'edit' ? "primary" : "inherit"} onClick={handleOpen}>{props.text}</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {componnent}
                </Box>
            </Modal>
        </div>
    );
}

/*
                    <Login handleClose={handleClose} setAdmin={setAdmin} />

*/
