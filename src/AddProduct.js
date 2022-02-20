import React, { useState, useEffect, useRef } from 'react'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { CInputGroup, CInputGroupText, CFormInput, CFormSelect } from '@coreui/react'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'
import TextField from '@mui/material/TextField';


let default_img = "image/add-product.png"
let reader = new FileReader()

export default function AddProduct(props) {

    const navigate = useNavigate()

    if (props.admin === false) {
        navigate("/")
    }

    let product_id
    if (localStorage.products === undefined)
        product_id = 1
    else {
        let max = 0
        let products_arr = JSON.parse(localStorage.products);
        products_arr.filter((product) => {
            if (product.id > max)
                max = product.id
        })
        product_id = max + 1
    }


    const [newProduct, setNewProduct] = useState(null);
    const [cat, setCat] = useState(null);
    const [name, setName] = useState(null);
    const [price, setPrice] = useState(null);
    const [company, setCompany] = useState(null);
    const [desc, setDesc] = useState(null);

    const [selectedImage, setSelectedImage] = useState(default_img);
    const fileInput = useRef(null)

    const handleChange = (event) => {
        if (event.target.value === 'null')
            return
        setCat(event.target.value);

    };


    const nameInput = (e) => {
        setName(e.target.value)
    }

    const companyInput = (e) => {
        setCompany(e.target.value)
    }

    const descInput = (e) => {
        setDesc(e.target.value)
    }

    const priceInput = (e) => {
        if (isNaN(e.target.value))
            return
        setPrice(e.target.value)
    }

    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            reader.onload = () => {
                setSelectedImage(reader.result);
            }
            reader.readAsDataURL(e.target.files[0])
        }
    };


    const addProduct = () => {
        if (name === null || cat === null || price === null || company === null || desc === null || selectedImage === default_img)
            return
        setNewProduct({ id: product_id, cat: cat, company: company, name: name, price: parseInt(price), total_price: parseInt(price), img: selectedImage, amount: 1, desc: desc })

    }

    useEffect(() => {
        if (newProduct != null) {
            let products_arr = JSON.parse(localStorage.products)
            let new_products_arr = [...products_arr, newProduct]
            localStorage.products = JSON.stringify(new_products_arr)
            product_id += 1
        }
    }, [newProduct])

    return (
        <div>
            <div className='add_product_container'>
                <CInputGroup className="flex-nowrap add_product_input">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput onChange={nameInput} placeholder="Product name" aria-label="name" aria-describedby="addon-wrapping" />
                </CInputGroup>
                <CInputGroup onChange={priceInput} className="flex-nowrap add_product_input">
                    <CInputGroupText>$</CInputGroupText>
                    <CFormInput placeholder="Product price" aria-label="price" aria-describedby="addon-wrapping" />
                </CInputGroup>
                <CInputGroup onChange={companyInput} className="flex-nowrap add_product_input">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Product company" aria-label="price" aria-describedby="addon-wrapping" />
                </CInputGroup>
                <div className="mb-3 add_product_input">
                    <CFormSelect onChange={handleChange} required aria-label="select example">
                        <option value={'null'}>Select category</option>
                        <option value={'jersey'}>jersey</option>
                        <option value={'hat'}>hat</option>
                        <option value={'shoe'}>shoe</option>
                    </CFormSelect>
                </div>
                <TextField className='product_desc' onChange={descInput} fullWidth label="product description" id="fullWidth" />
                <div className='add_product_img'>
                    <Button style={{ fontSize: 13 }} variant="outlined" onClick={() => fileInput.current.click()}>Choose Image</Button>
                    <input style={{ display: 'none' }} ref={fileInput} accept="image/*" type="file" onChange={imageChange} />
                    <img style={{ width: '200px', height: '300px' }}
                        src={selectedImage}></img>
                </div>
            </div>
            <div className='btn_add_product'>
                <Button style={{ fontSize: 16, width: '80%' }} variant="contained" onClick={addProduct} >Add product</Button>
            </div>
        </div >
    )
}
