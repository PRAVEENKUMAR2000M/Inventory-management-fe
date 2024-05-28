import React from 'react'
import "../../index.css"
import { logoutUser } from '../../services/authService'
import { useDispatch, useSelector } from 'react-redux'
import { SET_LOGIN, SET_NAME, selectName } from '../../redux/features/auth/authSlice'
import { useNavigate } from 'react-router-dom'



function Header() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const name = useSelector(selectName)
  //select name from authslice using useselector, this name is taken from local storage , dispatch(set_name) while login

  const handleLogout = async () => {
    await logoutUser()
    await dispatch(SET_LOGIN(false))
    await dispatch(SET_NAME(null))
    navigate("/login")
  }


  return (
    <div className="--pad header">
      <div className="--flex-between">
        <h3>
          <span className="--fw-thin">Welcome, </span>
          <span className="--color-danger">{name}</span>
        </h3>
        <button onClick ={handleLogout} className="--btn --btn-danger">
          Logout
        </button>
      </div>
      <hr />
    </div>  )
}

export default Header