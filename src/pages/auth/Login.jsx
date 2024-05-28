import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { RiLoginBoxFill } from "react-icons/ri";
import './style.css'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { loginUser } from '../../services/authService';
import { SET_LOGIN, SET_NAME } from '../../redux/features/auth/authSlice';
import Loader from '../../components/loader/Loader';


const initialState = {
  email: "",
  password: "",

}

function Login() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(initialState)
  const { email, password } = formData

  /* one function to hndle all input change */
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  /* email validation */
  const validateEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
  }

  /* form submit */
  const handleLogin = async (e) => {

    e.preventDefault()

    /* validations */
    if (!email || !password) {
      return toast.error("All fields required")
    }
    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email")
    }

    //create user data using form input
    const userData = {
      email, password
    }
    setIsLoading(true)

    /* try to login user */
    try {
      const data = await loginUser(userData);
      console.log(data);
      await dispatch(SET_LOGIN(true));
      await dispatch(SET_NAME(data.name));
      navigate("/dashboard");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }

  }

  return (
    <div className='login template d-flex justify-content-center align-items-center 100-w vh-100 bg-primary'>
      {isLoading && <Loader />}
      <div className='form-container p-5 rounded bg-white'>
        <form onSubmit={handleLogin}>
          <div className="--flex-center">
            <RiLoginBoxFill size={35} color='#999' />
          </div>
          <h3 className='text-center cred'>Login</h3>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">Email</label>
            <input
              type="email"
              placeholder='Enter name@domain.com...'
              className="form-control"
              name='email'
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
              name='password'
              value={password}
              onChange={handleInputChange}
            />
          </div>

          <div className='d-grid mb-3'>
            <button className='btn btn-primary'>Login</button>
          </div>

          <p className='text-end mb-3'>
            <Link to="/forgot" className='ms-2'>Forget Password?</Link>
          </p>
          <div className='d-flex --flex-between'>
            <p className='text-end mb-3'><Link to="/" className='ms-2'>Home</Link></p>
            <p className='text-end mb-3'>
              Don't have an account?  <Link to="/register" className='ms-2'>Register</Link>
            </p>
          </div>



        </form>
      </div>
    </div>

  )
}

export default Login