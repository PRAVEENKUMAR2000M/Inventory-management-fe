import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserPlus } from "react-icons/fa6";
import './style.css'
import { toast } from 'react-toastify';
// import { registerUser } from "../../services/authService"
import { registerUser } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { SET_LOGIN, SET_NAME, SET_USER } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';



const initialState = {
  name: "",
  email: "",
  password: "",
  password2: "",
}

function Register() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const { name, email, password, password2 } = formData

  /* one function to hndle all input change */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  /* email validation */
  const validateEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  }

  /* input validation */
  const handleRregister = async (e) => {
    e.preventDefault()   //to prevent default behavior of reloading the page
    
    if (!name || !email || !password || !password2) {
      return toast.error("All fields required")
    }
    if (password.length < 6) {
      return toast.error("Password must contain atleast 6 character")
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email")
    }
    if (password !== password2) {
      return toast.error("Password do not match")
    }

    const userData = {
      name, email, password
    }
    setIsLoading(true)

    /* try to register user */
    try {
      const data = await registerUser(userData)
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))
      navigate("/dashboard")
      setIsLoading(false)
    }
    catch (error) {
      setIsLoading(false)
      setIsLoading(error.message)
    }
  }

  return (
    <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary'>
      {isLoading && <Loader />}
      <div className='form-container p-5 rounded bg-white'>
        <form onSubmit={handleRregister}>
          <div className="--flex-center">
            <FaUserPlus size={35} color='#999' />
          </div>
          <h3 className='text-center cred'>Register</h3>
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">Name</label>
            <input
              type="text"
              placeholder='Enter name...'
              required
              className="form-control"
              name="name"
              value={name}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">Email</label>
            <input
              type="email"
              placeholder='Enter email'
              required
              className="form-control"
              name="email"
              value={email}
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Password" className="form-label">Password</label>
            <input
              type="password"
              placeholder='Enter password...'
              className="form-control"
              name="password"
              value={password}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">Confirm Password</label>
            <input
              type="password"
              placeholder='confirm password...'
              className="form-control"
              name="password2"
              value={password2}
              onChange={handleInputChange}
            />
          </div>

          <div className='d-grid mb-3'>
            <button className='btn btn-primary'>Register</button>
          </div>

          <div className='d-flex --flex-between'>
            <p className='text-end mb-3'><Link to="/" className='ms-2'>Home</Link></p>
            <p className='text-end mb-3'>
              Already Registered?  <Link to="/login" className='ms-2'>Login</Link>
            </p>
          </div>



        </form>
      </div>
    </div>
  )
}

export default Register