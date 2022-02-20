import React from 'react'
import ShopCard from './ShopCard'

export default function ProductsList(props) {
    let product_data = props.list.map((product) => <ShopCard product_data={product} add_to_cart={props.add_to_cart} />)
    return (
        <div>
            {product_data}
        </div>
    )
}
