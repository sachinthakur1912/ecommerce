import axios from 'axios'
import  { useEffect, useState } from 'react'

export default function UserApi(token) {
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [isAdmin,setIsAdmin] = useState(false)
    const [cart,setCart] = useState([])

    useEffect(()=>{
        if(token){
            const getUser = async()=>{
                try{
                    const res = await axios.get('/user/info',{
                        headers:{Authorization:token}
                    })
                    // console.log(res)
                    setIsLoggedIn(true)
                    res.data.role===1?setIsAdmin(true):setIsAdmin(false)
                }catch(err){
                    console.log("error hai bhai")
                    alert(err.response.data.msg)
                }
                
            }
            getUser()
        }
       
       
    },[token])
    const addToCart =(product)=>{
        // console.log(product)
        if(!isLoggedIn) return alert("Please login")
        const check = cart.every(item=>{
            return item.id !== product._id
        })
        if(check){
            setCart([...cart,{...product,quantity:1}])
        }
        else{
            alert("This product is already added")
        }
    }
    // console.log(cart);
  return {
   isLoggedIn:[isLoggedIn,setIsLoggedIn],
   isAdmin:[isAdmin,setIsAdmin],
   cart:[cart,setCart],
   addToCart:addToCart
  }
}
