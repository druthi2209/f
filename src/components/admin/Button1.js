import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Button1() {
    const navigate = useNavigate;
    function handleUser(){
        navigate("/addUser")
    }

    function handleMedicine(){
        navigate("/addMedicine")
    }
    
  return (
    <div>
        <button onClick={handleUser}>Add User</button>
        <button onClick={handleMedicine}>Add Medicine</button>
    </div>
  )
}
