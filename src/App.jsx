import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home/Home'
import Login from './pages/auth/Login'
import Forgot from './pages/auth/Forgot'
import Reset from './pages/auth/Reset'
import Register from './pages/auth/Register'
import Sidebar from './components/sidebar/Sidebar'
import Layout from './components/layout/Layout'
import Dashboard from './pages/dashboard/Dashboard'
import AddProduct from './pages/addProduct/AddProduct'
import axios from "axios"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { SET_LOGIN } from './redux/features/auth/authSlice'
import { getLoginStatus } from './services/authService'
import ProductDetail from './components/product/productDetail/ProductDetail'
import EditProduct from './pages/editProduct/EditProduct'
import Profile from './pages/profile/Profile'
import EditProfile from './pages/profile/EditProfile'
import Contact from './pages/contact/Contact'




/* when make req using axios, it make sure we able to save credential */
axios.defaults.withCredentials = true

function App() {

  const dispatch = useDispatch()   //dispatch in app is used to store details -logged in or not

  //useEffect will run once
  useEffect(() => {
    async function loginStatus() {
      const status = await getLoginStatus()
      dispatch(SET_LOGIN(status))
    }
    loginStatus()
  }, [dispatch])

  return (

    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/resetpwd/:resetToken" element={<Reset />} />
        <Route path="/register" element={<Register />} />

        {/* dashboard route */}
        <Route path='/dashboard' element={
          <Sidebar>
            <Layout>
              <Dashboard />
            </Layout>
          </Sidebar>
        } />
        {/* dashboard route */}

        {/* add product route */}
        <Route path='/add-product' element={
          <Sidebar>
            <Layout>
              <AddProduct />
            </Layout>
          </Sidebar>
        } />
        {/* add product route */}

        {/* get a product route */}
        <Route path='/product-details/:id' element={
          <Sidebar>
            <Layout>
              <ProductDetail />
            </Layout>
          </Sidebar>
        } />
        {/* get a product route */}

        {/* edit route */}
        <Route path='/edit-product/:id' element={
          <Sidebar>
            <Layout>
              <EditProduct />
            </Layout>
          </Sidebar>
        } />
        {/* edit route */}

        {/* get profile det route */}
        <Route path='/profile' element={
          <Sidebar>
            <Layout>
              <Profile />
            </Layout>
          </Sidebar>
        } />
        {/* get profilr det route */}

        {/* edit  profile det route */}
        <Route path='/edit-profile' element={
          <Sidebar>
            <Layout>
              <EditProfile />
            </Layout>
          </Sidebar>
        } />
        {/* edit profilr det route */}

        {/* report bug route */}
        <Route path='/contact-us' element={
          <Sidebar>
            <Layout>
              <Contact />
            </Layout>
          </Sidebar>
        } />
        {/* report bug route*/}
      </Routes>


    </BrowserRouter>
  )
}

export default App