import React from 'react'
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoMdCart } from "react-icons/io";
import { Link } from 'react-router-dom';
// import './header.css'
export default function Header() {
  return (
    <header>
      <div className='menu'>
      <IoMdMenu width={30}/>
      </div>
      <div className='logo'>
        <h1>
          <Link to='/'>Shop Sphere</Link>
        </h1>
      </div>
      <ul>
        <li><Link to='/'>Products</Link></li>
        <li><Link to='/login'>Login or Register</Link></li>
        <li><IoMdClose size={30} className='menu' /></li>
      </ul>
      <div className='cart-icon'>
        <span>
          0
        </span>
        <Link><IoMdCart size={30} /></Link>
      </div>
      
    </header>
  )
}
