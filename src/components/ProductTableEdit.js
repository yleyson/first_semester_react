import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import BasicModal from './BasicModal'
import ProductImg from './ProductImg';
import { FiEdit } from 'react-icons/fi';
import { flexbox } from '@mui/system';
import { useState, useEffect, useRef } from 'react';
import products from './Products';
import { useNavigate } from 'react-router-dom'
import Inputs from './Input';
import SelectLabels from './Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 16
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
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


let reader = new FileReader()
export default function CustomizedTableEditProduct(props) {

    const [product, setProduct] = useState(props.product)
    const [edit, setEdit] = useState("")
    const [value, setValue] = useState("")
    const [cat, setCat] = useState(props.product.cat);
    const [company, seCompany] = useState(props.product.company);
    const [name, setName] = useState(props.product.name);
    const [price, setPrice] = useState(props.product.price);
    const [desc, setDesc] = useState(props.product.desc);
    const [selectedImage, setSelectedImage] = useState(props.product.img);
    const isMounted = useRef(false);
    const fileInput = useRef(null)
    const navigate = useNavigate()



    const changValue = (e) => {
        setValue(e.target.value)
    }

    const changSelectValue = (select) => {
        setValue(select)
    }

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            reader.onload = () => {
                setSelectedImage(reader.result);
            }
            reader.readAsDataURL(e.target.files[0])
        }
    };

    const changeProduct = (attribute) => {
        if (value == "")
            return
        switch (attribute) {
            case "name":
                setName(value)
                break;
            case "price":
                if (isNaN(value))
                    return
                setPrice(value)
                break;
            case "category":
                setCat(value)
                break;
            case "company":
                seCompany(value)
                break;
            case "company":
                seCompany(value)
                break;
            case "desc":
                setDesc(value)
        }
    }

    const saveAllChanges = () => {
        setProduct({ id: product.id, cat: cat, company: company, name: name, price: parseInt(price), total_price: parseInt(price), img: selectedImage, amount: 1, desc: desc })
    }

    useEffect(() => {
        if (isMounted.current) {
            let products_arr = JSON.parse(localStorage.products);
            let product_index = null

            products_arr.filter((product_check, index) => {
                if (product_check.id === product.id)
                    product_index = index
            })

            products_arr[product_index] = product
            localStorage.products = JSON.stringify(products_arr);
            navigate('/ProductsManger')
        }
        else
            isMounted.current = true
    }, [product])

    return (
        <div>

            <TableContainer component={Paper}>
                <Table aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Name<FiEdit style={{ marginLeft: '10px' }} onClick={() => setEdit("name")} /></StyledTableCell>
                            <StyledTableCell align="center">Category<FiEdit style={{ marginLeft: '10px' }} className='FiEdit' onClick={() => setEdit("category")} /></StyledTableCell>
                            <StyledTableCell align="center">Company<FiEdit style={{ marginLeft: '10px' }} className='FiEdit' onClick={() => setEdit("company")} /></StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell component="th" scope="row">
                                {name}
                            </StyledTableCell>
                            <StyledTableCell align="center" >{cat}</StyledTableCell>
                            <StyledTableCell align="center">{company}</StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Price<FiEdit style={{ marginLeft: '10px' }} className='FiEdit' onClick={() => setEdit("price")} /></StyledTableCell>
                            <StyledTableCell align="center">Description<FiEdit style={{ marginLeft: '10px' }} className='FiEdit' onClick={() => setEdit("desc")} /></StyledTableCell>
                            <StyledTableCell align="center">Image</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <StyledTableRow>
                            <StyledTableCell align="center">{price}</StyledTableCell>
                            <StyledTableCell align="center"><BasicModal text={"description"} desc={desc} /></StyledTableCell>
                            <StyledTableCell align="center"><Button style={{ fontSize: 13, textTransform: 'none' }} variant="outlined" onClick={() => fileInput.current.click()}>Choose Image</Button>
                                <input style={{ display: 'none' }} ref={fileInput} accept="image/*" type="file" onChange={imageChange} /></StyledTableCell>
                        </StyledTableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            {edit !== "desc" ? <div className='input_edit_product'>
                <label>edit :</label>
                {edit === "category" ? <SelectLabels onChangeValue={changSelectValue} /> : <Inputs edit={edit} onChange={changValue} />}
                <Button style={{ textTransform: 'none' }} variant="outlined" onClick={() => changeProduct(edit)}>Save</Button>
            </div> :
                <div className='input_edit_product_desc'>
                    <TextField className='product_desc' onChange={changValue} fullWidth label="product description" id="fullWidth" />
                    <Button style={{ textTransform: 'none' }} variant="outlined" onClick={() => changeProduct(edit)}>Save</Button>
                </div>
            }
            <div className='input_edit_product_save'>
                <ProductImg cat={product.cat} src={selectedImage} />
                <Button variant="contained" onClick={saveAllChanges}>save all changes</Button>
            </div>

        </div >

    );
}
