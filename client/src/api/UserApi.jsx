import axios from 'axios'
import  { useEffect, useState } from 'react'

export default function UserApi(token) {
    const [isLoggedIn,setIsLoggedIn] = useState(false)
    const [isAdmin,setIsAdmin] = useState(false)

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
  return {
   isLoggedIn:[isLoggedIn,setIsLoggedIn],
   isAdmin:[isAdmin,setIsAdmin]
  }
}
