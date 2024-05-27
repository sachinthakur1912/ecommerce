import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { GlobalState } from '../../../../GlobalState'
import { Link } from 'react-router-dom'

export default function DetailProducts() {
    const params = useParams()
    const state = useContext(GlobalState)
    // console.log(state)
    const [products]= state.ProductApi.products
    // console.log(products)
    const [detailProducts,setDetailProducts] = useState([])

    useEffect(()=>{
        if(params){
            products.forEach(product =>{
                if(product._id === params.id) setDetailProducts(product)
            } )
        }
    },[params,products])
    console.log(detailProducts)
    if (!detailProducts) {
        return <div>Loading...</div>;
    }
  return (
    <div className='detail'>
        {detailProducts.images && detailProducts.images.link ? (
                <img src={detailProducts.images.link} alt="Product" className='detail-img' />
            ) : (
                <div>No image available</div>
            )}
            <div className='box-detail'>
                <div className="row">
                    <h2>{detailProducts.title}</h2>
                    <h6>{detailProducts.product_id}</h6>
                </div>
                <span>${detailProducts.price}</span>
                <p>{detailProducts.description}</p>
                <p>{detailProducts.content}</p>
                <p>{detailProducts.sold}</p>
                <Link to='/cart' className='cart'>Buy Now</Link>
            </div>
    </div>
  )
}
