import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { SET_LOGIN } from '../redux/features/auth/authSlice'
import { getLoginStatus } from '../services/authService'



function useRedirectLoggedOutUser(path) {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        const redirectLoggedOutUser = async () => {
            const isLoggedIn = await getLoginStatus()
            dispatch(SET_LOGIN(isLoggedIn))

            if (!isLoggedIn) {
                console.log("Session Expired")
                toast.info("Session Expired, Please login again!")
                navigate(path)
                return
            }
        }
        redirectLoggedOutUser()
    }, [navigate, path, dispatch])
}

export default useRedirectLoggedOutUser