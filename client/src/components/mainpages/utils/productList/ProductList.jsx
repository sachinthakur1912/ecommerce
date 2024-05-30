import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { GlobalState } from '../../../../GlobalState'
import axios from 'axios'
export default function ProductList({product}) {
  const state = useContext(GlobalState)
  const [products,setProducts] = state.ProductApi.products
  const [isAdmin]=state.UserApi.isAdmin
  const addToCart = state.UserApi.addToCart

  const deleteHandler =async (productId) =>{
    try{
      await axios.delete(`/api/products/${productId}`)
      setProducts(products.filter(p => p._id !== productId))
    }catch(error){
      console.error('Error in deleting product',error)
    }
   
  }
    // console.log(product)
  return (
    
    <div className='product_card'>
      {
      isAdmin && <input type='checkbox' checked={product.checked}/>
    }
      <img src={product.images.link} alt='product' />
        <div className='product_box'>
            <h2 title={product.title}>{product.title}</h2>
            <span>${product.price}</span>
            <p>{product.description}</p>
        </div>
        {
          isAdmin?
          <>
           <div className='row_btn'>
          <Link to={`/`} id='btn_buy' onClick= {()=>deleteHandler(product._id)}>
          Delete 
          </Link>
          <Link to={`details/${product._id}`} id='btn_view'>
            Edit
          </Link>
        </div>
          </>
          :
          <>
           <div className='row_btn'>
          <Link to={`/`} id='btn_buy' onClick={()=>{
            addToCart(product)
          }}>
          Buy 
          </Link>
          <Link to={`details/${product._id}`} id='btn_view'>
            View
          </Link>
        </div>
          </>
        }
       
    </div>
  )
}
