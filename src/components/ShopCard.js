import React from 'react'
import { CCard, CCardBody, CRow, CCol, CButton, CCardTitle, CCardText } from '@coreui/react'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'




export default function ShopCard(props) {
    let width = props.product_data.cat == 'jersey' ? '150px' : '200px'
    return (
        <div>
            <CCard className="mb-3 card_shop_container" style={{ maxWidth: '450px', minWidth: '450px', minHeight: '280px', maxHeight: '290px', borderRadius: '5%', background: 'rgb(230, 223, 223, 0.842)' }}>
                <CRow className="g-0" style={{ minHeight: '280px', maxHeight: '290px' }}>
                    <CCol className='img_card_shop' sm={5} md={4} style={{ minHeight: '280px', maxHeight: '290px' }}>
                        <div></div>
                        <img style={{ minWidth: width, maxWidth: width, minHeight: '200px', maxHeight: '290px' }} src={props.product_data.img}></img>
                    </CCol>
                    <CCol sm={7} md={8} style={{ minHeight: '280px', maxHeight: '290px' }}>
                        <CCardBody className='card_body'>
                            <div>
                                <CCardTitle style={{ fontSize: '25px' }}>{props.product_data.name}</CCardTitle>
                                <small className="text-medium-emphasis">{props.product_data.company}</small>
                            </div>

                            <div className='card_text'>
                                <CCardText >
                                    {props.product_data.desc}
                                </CCardText>
                                <div className='shop_card_buy'>
                                    <p style={{ fontWeight: "bold", fontSize: "25px" }}>{props.product_data.price}$</p>
                                    <CButton onClick={() => props.add_to_cart(props.product_data)} style={{ fontSize: "20px", width: '40%' }} shape="rounded-pill" color="dark" >Buy</CButton>
                                </div>
                            </div>
                        </CCardBody>
                    </CCol>
                </CRow>
            </CCard>
        </div >
    )
}



