import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import ProductList from '../utils/productList/ProductList'

export default function Product() {
    const state = useContext(GlobalState)
    const [products] = state.ProductApi.products
    // console.log(state)
  return (
    <div className='products'>
       {products && products.length > 0 ? (
      products.map((product) => (
        <ProductList key={product._id} product={product} />
      ))
    ) : (
      <p>No products available</p>
    )}
    </div>
  )
}
