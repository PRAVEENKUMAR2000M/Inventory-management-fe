import React, { useEffect } from 'react'
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsLoggedIn } from '../../redux/features/auth/authSlice'
import { getProducts } from '../../redux/features/product/productSlice'
import ProductList from '../../components/product/productList/ProductList'
import ProductSummary from '../../components/product/productSummary/ProductSummary'

const Dashboard = () => {
  //check if user is logged in and session is active
  useRedirectLoggedOutUser("/login")

  const dispatch = useDispatch()

  //useSelector - used to select state from diff slice
  const isLoggedIn = useSelector(selectIsLoggedIn)  //authSlice
  const { products, isLoading, isError, message } = useSelector((state) => state.product)  //product slice

  //check everytime when page refresh
  useEffect(() => {
    if (isLoggedIn === true) {
      console.log("check if logged in:", isLoggedIn)
      dispatch(getProducts())   // product slice
      if (isError) {
        console.log(message)
      }
    }
  }, [isLoggedIn, isError, message, dispatch])

  return (
    <div>
      <h2>Dashboard</h2>
      <ProductSummary products={products} />
      <ProductList products={products} isLoading=
        {isLoading} />
    </div>
  )
}

export default Dashboard