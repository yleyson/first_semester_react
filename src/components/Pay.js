import React from 'react'
import { CButton } from '@coreui/react'
import { useLocation } from 'react-router-dom'
import PaymentTable from './PaymentTable'
import { useNavigate } from 'react-router-dom'


export default function Pay(props) {
    const { state } = useLocation()
    let total_sum = state
    let cart = null
    const navigate = useNavigate()

    if (props.user === false) {
        navigate("/")
    }

    if (sessionStorage.cart !== undefined) {
        cart = JSON.parse(sessionStorage.cart)
    }
    else
        return


    return (
        <div className='pay_container'>
            <PaymentTable cart={cart} />
            <div style={{ marginTop: '20px' }}>
                <p>Total price to pay: {total_sum}$</p>
            </div>
            <CButton onClick={() => { if (cart.length == 0) { return } alert('Thank you for buying from us'); sessionStorage.cart = JSON.stringify([]); props.amountOfProducts(); navigate("/") }}
                style={{ marginTop: '20px' }} color="success" shape="rounded-pill">Pay</CButton>
            <CButton onClick={() => navigate("/ShopCart")} style={{ marginTop: '20px' }} color="danger" shape="rounded-pill">cancel</CButton>
        </div>
    )
}
