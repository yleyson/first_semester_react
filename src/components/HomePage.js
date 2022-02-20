import React from 'react'
import { FcCameraIdentification } from 'react-icons/fc';
import { Button } from '@mui/material';
import Roller from './Roller';
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import Results from './Results';
import { useState } from 'react';

let srotage = localStorage.getItem('users')
let products = localStorage.getItem('products')
export default function HomePage() {

    const [product, setProduct] = useState(products)
    const [storage, setStorge] = useState(srotage)


    return (
        <div className='home_page_container'>
            <div>
                <h1 style={{ color: 'white' }}>NewsBA<SportsBasketballIcon className='camera_icon' />
                </h1>
            </div>
            <Roller />
            <br />
            <Results />
        </div>
    )
}
