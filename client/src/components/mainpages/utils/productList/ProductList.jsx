import React from 'react'

export default function ProductList({product}) {
    console.log(product)
  return (
    <div className='product_card'>
      <img src={product.images.link} height='150px' />
        <div className='product_box'>
            <h2 title={product.title}>{product.title}</h2>
            <span>${product.price}</span>
            <p>{product.description}</p>
        </div>
    </div>
  )
}
