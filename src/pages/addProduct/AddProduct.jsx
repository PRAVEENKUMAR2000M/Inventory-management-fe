import React, { useState } from 'react'
import ProductForm from '../../components/product/productForm/ProductForm'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, selectIsLoading } from '../../redux/features/product/productSlice'
import { useNavigate } from 'react-router-dom'
import Loader from '../../components/loader/Loader'


//initialize states - form input
const initialState = {
    name: "",
    catagory: "",
    quantity: "",
    price: "",
}

const AddProduct = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    //creating usestate for reuired value
    const [product, setProduct] = useState(initialState)
    const [productImage, setProductImage] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const [description, setDescription] = useState("")

    const isLoading = useSelector(selectIsLoading)  //this is from product slice

    const {name, catagory, price, quantity } = product //destructure input value

    //handle form input value
    const handleInputChange = (e) => {
        const {name, value } = e.target
        setProduct({...product, [name]: value})  
    }

    //handle image - to get image, to preview image
    const handleImageChange = (e) => { 
        setProductImage(e.target.files[0])
        setImagePreview(URL.createObjectURL(e.target.files[0]))  //createObjectURL will give temp access to preview the file 
    }
    
    //sku contains - letter from 'catagory' and numbers
    const generateSKU = (catagory) => {
        const letter = catagory.slice(0, 3).toUpperCase();
        const number = Date.now();
        const sku = letter + "-" + number;
        return sku;
    };

    //creating form data and  productslice call to createProduct functionality
    const saveProduct = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("name", name)
        formData.append("sku", generateSKU(catagory))
        formData.append("catagory", catagory)
        formData.append("quantity", quantity)
        formData.append("price", price)
        formData.append("description", description)
        formData.append("image", productImage)

        console.log(...formData)

        //save to database
        await dispatch(createProduct(formData))
        navigate("/dashboard")

   }

  return (
      <div>
          {isLoading && <Loader />}
          <h1 className='container'>Add New Product</h1>      
          <ProductForm
            product = {product}
            productImage={productImage}
            imagePreview={imagePreview}
            description={description}
            setDescription={setDescription}
            handleInputChange={ handleInputChange} 
            handleImageChange={ handleImageChange} 
            saveProduct={ saveProduct} 
          />
    </div>
  )
}

export default AddProduct