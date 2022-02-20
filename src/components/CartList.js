import React from 'react'
import CartCard from './CartCard'

export default function CartList(props) {
    let cart_data = null
    if (props.list != null)
        cart_data = props.list.map((product) => <CartCard add_one_or_less_to_cart={props.add_one_or_less_to_cart} product_data={product}
            delete_from_cart={() => props.delete_from_cart(product.id)}
        />)

    return (
        <div>
            {cart_data == null ? <p>No porduct in your cart</p> : cart_data}
        </div>
    )
}
