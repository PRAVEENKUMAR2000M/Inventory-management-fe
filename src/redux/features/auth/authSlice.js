import { createSlice } from '@reduxjs/toolkit'


try {
  //getting name from loacal storage
  const name = JSON.parse(localStorage.getItem("name"))
} catch (error) {
  console.log(`Error : ${error}`)
}



/* initialize state - for authnticaton */
const initialState = {
  isLoggedIn: false,
  name: name ? name : "",
  user: {
    name:"",
    email:"",
    phone:"",
    bio:"",
    photo:"",
  },
}

/* create reducer actions for FE */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /* when user login , set login to true */
    SET_LOGIN(state, action) {
      state.isLoggedIn = action.payload
    },
    /* set user name  */
    SET_NAME(state, action) {
      localStorage.setItem("name", JSON.stringify(action.payload))
      state.name = action.payload
    },
    /* save user object */
    SET_USER(state, action) {
      const profile = action.payload;
      console.log(action.payload)
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.bio = profile.bio;
      state.user.photo = profile.photo;
    },
  }
});


/* export the actions */
export const { SET_LOGIN, SET_NAME, SET_USER} = authSlice.actions

/* export individual state */
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn
export const selectName = (state) => state.auth.name
export const selectUser = (state) => state.auth.user

export default authSlice.reducer