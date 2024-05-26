import React, { useEffect } from 'react'
import PropForm from '../components/PropForm'
import Navbar from '../components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function AddProp() {
  const navigate = useNavigate()
  const user = useSelector(state => state.user)
  useEffect(()=>{
    if(!user.user){
      navigate('/')
    }

  },[user])
  return (
    <>
    <Navbar />
    <div className='w-full flex justify-center bg-white'>
        <PropForm />
    </div>
    </>
    
  )
}
