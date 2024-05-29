/* this file contains all http request sends to backend */

import axios from "axios"
import { toast } from "react-toastify"
import config from "../utils/config"

export const BE_URL = config.API_URL



/* register user - axios call to backend with userdata */
export const registerUser = async (userData) => {
    try {
        const response = await axios
            .post(`${BE_URL}/api/users/register`, userData, { withCredentials: true })  // parameters sent in axios call - url,dataSenttoApiReq, cookie
        console.log(response)
        if (response.statusText === "OK") {
            toast.success('User Registered Successfully')
        }
        return response.data
    }
    catch (error) {
        /* since error may received in dif forms */
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(message)
    }
}


/*login user - axios call to backend with email and pwd */
export const loginUser = async (userData) => {
    try {
        const response = await axios.post(
            // `https://inventory-management-dcd4.onrender.com/api/users/login`,
            `${BE_URL}/api/users/login`,
            userData
        )
        console.log(response.statusText)
        if (response.statusText === "Created") {
            toast.success("Login Successful...");
        }
        return response.data;
    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
}

/*get user data- axios call to backend to fetch current loggedin user */
export const getUser = async () => {
    try {
        const response = await axios.get(`${BE_URL}/api/users/getuser`)
        return response.data
    } catch (error) {
        console.log(error)
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
}

/*user profile -  axios call to backend to update profile details*/
export const updateUser = async (formData) => {
    try {
        const response = await axios.patch(`${BE_URL}/api/users/updateuser`, formData)
        return response.data
    } catch (error) {
        console.log(error)
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
}

/*logout user - axios call to backend without props */
export const logoutUser = async () => {
    try {
        const response = await axios
            .get(`${BE_URL}/api/users/logout`, /* { withCredentials: true } - this is made common in app.jsx */
            )  // parameters sent in axios call - url,dataSenttoApiReq, cookie

        if (response.statusText === "OK") {
            toast.success('Logout Successful...')
        }
    }
    catch (error) {
        /* since error may received in dif forms */
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(message)
        return error
    }
}

/*Forgot password user - axios call to backend with email to receive pwd reset link  */
export const forgotPassword = async (userData) => {
    try {
        const response = await axios
            .post(`${BE_URL}/api/users/forgotpwd`, userData)
        console.log("response:", response)
        toast.success(response.data.message)
    }
    catch (error) {
        /* since error may received in dif forms */
        const message = (
            error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        toast.error(message)
    }
}


/*reset password  - axios call to backend with password and reset token */
export const resetPassword = async (userData, resetToken) => {
    try {
        const response = await axios.put(
            `${BE_URL}/api/users/resetpwd/${resetToken}`,
            userData
        );
        console.log(response)
        if (response.statusText === "OK") {
            toast.success("Password reset successful, please login")
        }
        return response.data
    }
    catch (error) {
        /* since error may received in dif forms */
        const message = (
            error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        toast.error(message)
    }
}

//get login status
export const getLoginStatus = async () => {
    try {
        const response = await axios.get(
            `${BE_URL}/api/users/loggedin`,
            {withCredentials:true}
        );
        return response.data
    }
    catch (error) {
        /* since error may received in dif forms */
        const message = (
            error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
        toast.error(message)
    }
}

//change pwd
export const changePassword = async (formData) => {
    try {
        const response = await axios.patch(
            `${BE_URL}/api/users/changepwd`,
            formData
        );

        return response.data;

    } catch (error) {
        const message =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString();
        toast.error(message);
    }
};