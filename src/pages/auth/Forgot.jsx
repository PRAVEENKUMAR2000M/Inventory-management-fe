import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { MdEmail } from "react-icons/md";
import './style.css'
import { toast } from 'react-toastify';
import { forgotPassword } from '../../services/authService';

function Forgot() {

  const [email, setEmail] = useState("")

  /* email validation */
  const validateEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  }

  /* handle forget password */
  const handleForgetPwd = async (e) => {
    e.preventDefault()

    /* validations */
    if (!email) {
      return toast.error("Please enter email")
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email")
    }
    const userData = {
      email
    }
    try {
      await forgotPassword(userData)
      setEmail("")
    }
    catch (error) {
      console.log(error.message);
      
    }
    
  }
  
  return (
    <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary'>
      <div className='form-container p-5 rounded bg-white'>
        <form onSubmit={handleForgetPwd}>
          <div className="--flex-center">
            <MdEmail size={35} color='#999' />
          </div>
          <h3 className='text-center cred'>Forget Password</h3>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">Email</label>
            <input
              type="email"
              placeholder='Enter name@domain.com...'
              className="form-control"
            value= {email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            />
          </div>

          <div className='d-grid mb-3'>
            <button className='btn btn-primary'>Get Reset Email</button>
          </div>

          <div className='d-flex --flex-between'>
            <p className='text-end mb-3'><Link to="/" className='ms-2'>- Home</Link></p>
            <p className='text-end mb-3'><Link to="/login" className='ms-2'>- Login</Link>
            </p>
          </div>



        </form>
      </div>
    </div>
  )
}

export default Forgot