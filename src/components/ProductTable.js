import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ProductImg from './ProductImg';
import { FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'
import { RiDeleteBinLine } from 'react-icons/ri';
import { useState } from 'react';
import AlertDialog from './AlertDialog';
import ImgModal from './ImgModal'
import BasicModal from './BasicModal';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));




export default function CustomizedTables(props) {
    const navigate = useNavigate()


    return (
        <div>

            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Name</StyledTableCell>
                            <StyledTableCell align="center">Category</StyledTableCell>
                            <StyledTableCell align="center">Price</StyledTableCell>
                            <StyledTableCell align="center">Image</StyledTableCell>
                            <StyledTableCell align="center">Edit\Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.prodcuts_list.map((product) => (
                            <StyledTableRow key={product.id}>
                                <StyledTableCell component="th" scope="row">
                                    {product.name}
                                </StyledTableCell>
                                <StyledTableCell align="center">{product.cat}</StyledTableCell>
                                <StyledTableCell align="center">{product.price}</StyledTableCell>
                                <StyledTableCell align="center"><BasicModal text={"image view"} comp={"productImg"} product={product} /></StyledTableCell>
                                <StyledTableCell align="center" ><div className='edit_delete'><FiEdit onClick={() => navigate('/EditProduct', { state: product })} style={{ fontSize: '20px' }} />
                                    <div className='vertical_line'></div>  <AlertDialog delete_product={() => props.delete_product(product.id)} /></div></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}
