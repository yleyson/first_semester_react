import React from 'react'
import MediaCard from './Card'
import CustomizedMenus from './DropDown'
import ShopCard from './ShopCard'
import { useState, useReducer } from 'react'
import ProductsList from './ProductsList'
import products_arr from './Products'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function NbaShop(props) {

    if (localStorage.products === undefined)
        localStorage.products = JSON.stringify(products_arr)

    const products = JSON.parse(localStorage.products)
    const [filtersProduct, setFiltersProduct] = useState(products)
    const [dropdown, setDropdown] = useState(true)
    const [category, setCategory] = useState('Categories')
    const [any, forceUpdate] = useReducer(num => num + 1, 0);

    //סינון לפי קטגוריה
    const filters = (filter) => {

        switch (filter) {
            case 'Jersey':
                setFiltersProduct(products.filter(product => product.cat == 'jersey'))
                break
            case 'Shoes':
                setFiltersProduct(products.filter(product => product.cat == 'shoe'))
                break
            case 'Hats':
                setFiltersProduct(products.filter(product => product.cat == 'hat'))
                break
            case 'All':
                setFiltersProduct(products)
                break
        }
    }


    const addToCart = (product) => {
        let cart = null
        let newCart = null
        let amountIndex = null
        if (sessionStorage.cart !== undefined) {
            cart = JSON.parse(sessionStorage.cart);

            cart.filter((product_check, index) => {
                if (product_check.id === product.id)
                    amountIndex = index
            })

            if (amountIndex != null) {
                cart[amountIndex].amount++
                cart[amountIndex].total_price = cart[amountIndex].price * cart[amountIndex].amount
                sessionStorage.cart = JSON.stringify(cart);
                props.amountOfProducts()
                return
            }

            newCart = [...cart, product];
            sessionStorage.cart = JSON.stringify(newCart);
        }
        else {
            sessionStorage.cart = JSON.stringify([product]);
        }
        props.amountOfProducts()
    }

    //מיון לפי מחיר
    const Sort = (order, category = '') => {
        let sort_arr = filtersProduct
        switch (order) {
            case 'low':
                sort_arr.sort(function (a, b) { return a.price - b.price });
                break;
            case 'high':
                sort_arr.sort(function (a, b) { return b.price - a.price });
                break;
            case 'cancel':
                filters(category === 'Categories' ? 'All' : category)
                return
                break;
        }
        setFiltersProduct(sort_arr)
        forceUpdate()
    }

    return (
        <div className='shop_page'>
            <div className='shop_header'>
                <div className='shop_h1_amount'>
                    <h1>Shop</h1>
                </div>

                <button className='btn_drop_down_cat' onClick={() => setDropdown(!dropdown)}>{category}{dropdown ? <ExpandMoreIcon /> : <ExpandLessIcon />}</button>
                <div className='btn_drop_down_cat_container'>
                    {dropdown ? null :
                        <ul className='ul_cat'>
                            <li onClick={() => { filters('Jersey'); setDropdown(true); setCategory('Jersey') }}>jersey</li>
                            <li onClick={() => { filters('Shoes'); setDropdown(true); setCategory('Shoes') }}>shoe</li>
                            <li onClick={() => { filters('Hats'); setDropdown(true); setCategory('Hats') }}>hat</li>
                            <li onClick={() => { filters('All'); setDropdown(true); setCategory('All') }}>all</li>
                        </ul>
                    }
                </div>
            </div>
            <div className='sort_price'>
                <p>Sort by price:</p>
                <div className='btn_sort'>
                    <Button variant="outlined" onClick={() => Sort('low')}>Low</Button>
                    <Button variant="outlined" onClick={() => Sort('high')}>High</Button>
                    <Button variant="outlined" onClick={() => Sort('cancel', category)}>Cancel</Button>
                </div>
            </div>
            <div className='shop_container'>
                <ProductsList add_to_cart={addToCart} list={filtersProduct} />
            </div>
        </div>

    )
}
