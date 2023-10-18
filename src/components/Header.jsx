import React, { useContext, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { ApiContext } from './context/userContext'

export default function Header() {
  const{isLogOut,setIsLogOut}= useContext(ApiContext)

  

  const logOut = () => {
    localStorage.removeItem("tkn")
    setIsLogOut(true)
  }
  useEffect(()=>{
    if (localStorage.getItem("tkn") != null) {
      setIsLogOut(false)
    }else{
      setIsLogOut(true)
    }
  },[])


  return (
    <header className='bg-slate-50 py-4 px-5 shadow-sm'>
      <div className='flex justify-between items-center '>
        <Link to='/' className='text-[26px] font-bold '> My Blogs </Link>
        <div>
          {!isLogOut? <div> <Link to="/createPost" className='p-2  mr-3 text-dark font-semibold outline rounded-md outline-2  outline-offset-2 '>create post</Link>
            <button onClick={logOut} className='p-2 bg-orange-900 mr-3 text-white rounded-md'>Log out</button> </div> :
            <div> <Link to="/login" className='p-2 bg-gray-950  mr-3 text-white rounded-md'>Login</Link>
              <Link to='/register' className='p-2 bg-gray-500 rounded-md mr-3 text-white'>Register</Link></div>
          }


        </div>
      </div>
    </header>
  )
}
