import React from 'react'
import { useState, useEffect, useReducer } from 'react'
import BasicModal from './BasicModal'
import CartCard from './CartCard'
import CartList from './CartList'
import Pay from './Pay'
import { CButton } from '@coreui/react'
import { useNavigate } from 'react-router-dom'


export default function ShopCart(props) {

    if (sessionStorage.cart === undefined)
        sessionStorage.cart = JSON.stringify([])

    let cart_list = JSON.parse(sessionStorage.cart)


    const [products, setsProducts] = useState(cart_list)
    const navigate = useNavigate()





    useEffect(() => {
        if (sessionStorage.cart !== undefined)
            sessionStorage.cart = JSON.stringify(products);
        props.amountOfProducts()
    }, [products])

    const delete_from_cart = (id) => {
        let new_list = products.filter(product => product.id !== id)
        setsProducts(new_list)
    }

    const add_one_or_less_to_cart = (id, op) => {
        let product_index = null
        let new_list = products
        new_list.filter((product_check, index) => {
            if (product_check.id === id) {
                product_index = index
                if (new_list[product_index].amount == 1 && op == "-")
                    return
                op == "+" ? new_list[product_index].amount++ : new_list[product_index].amount--
                new_list[product_index].total_price = new_list[product_index].price * new_list[product_index].amount
                return
            }
        })
        sessionStorage.cart = JSON.stringify(new_list);
        props.amountOfProducts()
        setsProducts(new_list)
    }

    //מחיר כל המוצרים בעגלה
    const total_sum = () => {
        let sum = 0
        if (products.length > 0)
            products.filter((product) => {
                sum += product.total_price
            })
        return sum
    }



    return (
        <div className='shop_cart_container'>
            <div>
                <CartList add_one_or_less_to_cart={add_one_or_less_to_cart} delete_from_cart={delete_from_cart} list={products.length == 0 ? null : products} />
            </div>
            <div className='totals_cart'>
                <p>Total Sum: {total_sum()}$</p>
                <p>Products: {props.productAmount}</p>
            </div>
            <CButton style={{ fontSize: "20px", fontWeight: 'bold', width: '100%' }} color="info" shape="rounded-pill"
                onClick={() => { if (JSON.parse(sessionStorage.login_user) === '') { return } navigate('/Pay', { state: total_sum() }) }}>Pay</CButton>
        </div>
    )
}
