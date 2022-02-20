import React from 'react'
import BasicModal from './BasicModal';
import ProductInfo from './ProductInfo';


export default function ListFav(props) {
    let list = <ul className='fav_list'>
        {props.list.products.map((value, index) =>
        (
            <li>{index + 1} - {value} <BasicModal text={"info"} comp={<ProductInfo text={value} />} /></li>
        ))}
    </ul>
    return (
        <div>
            {list}
        </div>
    )
}
