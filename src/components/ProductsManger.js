import React from 'react'
import CustomizedTables from './ProductTable'
import { useState, useEffect } from 'react'
import products_arr from './Products'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button';

export default function ProductsManger(props) {

    if (localStorage.products === undefined)
        localStorage.products = JSON.stringify(products_arr)

    const [products, setProdcuts] = useState(JSON.parse(localStorage.products))
    const navigate = useNavigate()


    useEffect(() => {
        localStorage.products = JSON.stringify(products);
    }, [products])

    const deleteProduct = (id) => {
        let new_list = products.filter(product => product.id !== id)
        setProdcuts(new_list)
    }

    if (props.admin === false) {
        navigate("/")
    }

    return (
        <div>
            <CustomizedTables delete_product={deleteProduct} prodcuts_list={products} />
            <Button style={{ width: '100%', marginTop: '40px' }} variant="contained" onClick={() => navigate("/AddProduct")}>Add Product</Button>
        </div>
    )
}
