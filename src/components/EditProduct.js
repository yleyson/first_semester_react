import React from 'react';
import CustomizedTableEditProduct from './ProductTableEdit';
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function EditProduct(props) {

    const navigate = useNavigate()

    if (props.admin === false) {
        navigate("/")
    }

    const { state } = useLocation()
    let product = state
    return (
        <div>
            <CustomizedTableEditProduct product={product} />
        </div>
    )
}
