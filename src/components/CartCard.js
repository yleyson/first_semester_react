import React from 'react'
import { CButton } from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { RiDeleteBinLine } from 'react-icons/ri';
import { FaMinus, FaPlus } from 'react-icons/fa';


export default function CartCard(props) {
    return (
        <div>
            <div className='cart_card_container'>
                <div className='cart_card_text'>
                    <div className='cart_card_text_header'>
                        <h1>{props.product_data.name}</h1>
                        <RiDeleteBinLine className='delete_from_cart_icon' onClick={props.delete_from_cart} />
                    </div>

                    <div className='cart_card_price'>
                        <p>Price: {props.product_data.price}$</p>
                        <p>Total: {props.product_data.total_price}$</p>
                    </div>
                    <div className='cart_card_amount'>
                        <CButton style={{ width: '50px' }} onClick={() => props.add_one_or_less_to_cart(props.product_data.id, "-")} color="secondary" shape="rounded-pill"><FaMinus /></CButton>
                        <p>{props.product_data.amount}</p>
                        <CButton style={{ width: '50px' }} onClick={() => props.add_one_or_less_to_cart(props.product_data.id, "+")} color="secondary" shape="rounded-pill"><FaPlus /></CButton>
                    </div>
                </div>
                <div className='cart_card_img'>
                    <img src={props.product_data.img}></img>
                </div>
            </div>
        </div>
    )
}
