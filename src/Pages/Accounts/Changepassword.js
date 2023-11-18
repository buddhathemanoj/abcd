import React from 'react'
import Button from 'react-bootstrap/Button';
import { IoKeyOutline } from "react-icons/io5";

const Changepassword = () => {
  return (
    <div className='d-flex justify-content-center align-items-center' style={{height:"90vh"}}>
    <div className='shadow p-4 mb-3 w-50 text-center ' >
        <h3 style={{textAlign:'center', marginBottom:'2rem'}}>Change Password</h3>

        <div >

        <input style={{marginBottom:'2rem', width:'75%', height:'2.5rem'}}
                type="password"
                name="password"
                placeholder='Old Password'
                className='border rounded'
                
                
        /><br></br>
        <input style={{marginBottom:'2rem', width:'75%', height:'2.5rem' }}
                type="password"
                name="password"
                placeholder='New Password'
                className='border rounded'
                
        /><br></br>
          <input style={{marginBottom:'2rem', width:'75%', height:'2.5rem'}}
                type="password"
                name="password"
                placeholder='Confirm Password'
                className='border rounded'
                
         />

        <Button variant="secondary">Change Password</Button>
        </div>
    </div>
    </div>
  )
}

export default Changepassword