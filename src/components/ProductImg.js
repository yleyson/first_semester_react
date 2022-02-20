import React from 'react';

export default function ProductImg(props) {
    return (
        <div className='product_img'>
            <img style={{ width: props.cat == "jersey" ? 200 : 250, height: props.cat == "jersey" ? 300 : 350 }} src={props.src} alt="" />
        </div>
    )
}
