import React, { useContext } from 'react'
import { IoMdMenu } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoMdCart } from "react-icons/io";
import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';
// import './header.css'
export default function Header() {
  const state = useContext(GlobalState)
  console.log(state)
  const [isLoggedIn,setIsLoggedIn] = state.UserApi.isLoggedIn
  const [isAdmin,setIsAdmin] = state.UserApi.isAdmin

  const adminRouter = ()=>{
    return(
      <>
        <li>
          <Link to='/create_products'>Create Products</Link>
        </li>
        <li>
          <Link to='/category'>Categories</Link>
        </li>
       
      </>
    )
  }
  const loggedRouter = ()=>{
    return(
      <>
        <li>
          <Link to='/history'>History</Link>
        </li>
        <li>
          <Link to='/login' onClick={logoutHandler} >Logout</Link>
        </li>
      </>
    )
  }

  const logoutHandler=async()=>{
    await axios.get('/user/logout')
    localStorage.clear()
    setIsAdmin(false)
    setIsLoggedIn(false)
  } 
  // console.log(state)
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
       
        
        {isAdmin&&adminRouter()}
        {
          isLoggedIn?loggedRouter(): <li><Link to='/login'>Login or Register</Link></li>
        }
       
        <li><IoMdClose size={30} className='menu' /></li>
      </ul>
      {
        isAdmin?'': (<div className='cart-icon'>
        <span>
          0
        </span>
        <Link><IoMdCart size={30} /></Link>
      </div>)
      }
     
      
    </header>
  )
}
