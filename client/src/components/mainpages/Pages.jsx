import React from 'react'
import Product from './products/Product'
import Register from './login/Register'
import Login from './login/Login'
import Cart from './cart/Cart'
import { Route, Routes } from 'react-router'
import DetailProducts from './utils/detailProducts/DetailProducts'
export default function Pages() {
  return (
    <Routes>
        <Route path='/' element={<Product/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/details/:id' element={<DetailProducts/>}/>
    </Routes>
  )
}
