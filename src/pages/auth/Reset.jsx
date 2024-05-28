import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MdPassword } from "react-icons/md";
import './style.css'
import { toast } from 'react-toastify';
import { resetPassword } from '../../services/authService';

const initialState = {
  password: "",
  password2: "",

}

function Reset() {
    const [formData, setFormData] = useState(initialState)
  const { password, password2 } = formData
  const navigate = useNavigate()

  const { resetToken } = useParams() //useparam hook help to retrieve data from url

  /* one function to hndle all input change */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  /* to handle reset password */
  const handleResetPwd = async (e) => {
    e.preventDefault()

    if (!password || !password2) {
      return toast.error("All fields required")
    }
    if (password !== password2) {
      return toast.error("Password do not match")
    }
    if (password.length < 6) {
      return toast.error("Password must contain atleast 6 character")
    }
    const userData = {
      password, password2
    }
    try {
      const data = await resetPassword(userData, resetToken);
      navigate("/login")
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary'>
      <div className='form-container p-5 rounded bg-white'>
        <form onSubmit={handleResetPwd}>
          <div className="--flex-center">
            <MdPassword size={35} color='#999' />
          </div>
          <h3 className='text-center cred'>Reset Password</h3>
          <div className="mb-3">
            <input
              type="password"
              placeholder="New Password"
              className="form-control"
              required
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              placeholder='Confirm new password'
              className="form-control"
              required
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />
          </div>
          <div className='d-grid mb-3'>
            <button className='btn btn-primary'>Reset Password</button>
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

export default Reset