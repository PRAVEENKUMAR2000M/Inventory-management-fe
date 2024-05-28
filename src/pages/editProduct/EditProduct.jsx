import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct, getProducts, selectIsLoading, selectProduct, updateProduct } from '../../redux/features/product/productSlice';
import Loader from '../../components/loader/Loader';
import ProductForm from '../../components/product/productForm/ProductForm';

const EditProduct = () => {

  const { id } = useParams();

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const isLoading = useSelector(selectIsLoading)  //this is from product slice
  const productEdit = useSelector(selectProduct) //to get curent product

  //states req for product
  const [product, setProduct] = useState(productEdit)
  const [productImage, setProductImage] = useState("")
  const [imagePreview, setImagePreview] = useState(null)
  const [description, setDescription] = useState("")

  /*  handle refresh page */
  useEffect(() => {
    dispatch(getProduct(id))
  }, [dispatch, id])

  useEffect(() => {
    setProduct(productEdit)
    /* preview image from database -  */
    setImagePreview(
      productEdit && productEdit.image ? `${productEdit.image.filePath}` : null
    )
    setDescription(
      productEdit && productEdit.description ? productEdit.description : ""
    )
  }, [productEdit])
  /*  handle refresh page */



  //handle  input chnage - like add product
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProduct({ ...product, [name]: value })
  }

  //handle image change- to get image, to preview image - like add product
  const handleImageChange = (e) => {
    setProductImage(e.target.files[0])
    setImagePreview(URL.createObjectURL(e.target.files[0]))  //createObjectURL will give temp access to preview the file 
  }

  //creating form data and  productslice call to createProduct functionality
  const saveProduct = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", product?.name)  //optional chanining
    formData.append("catagory", product?.catagory)
    formData.append("quantity", product?.quantity)
    formData.append("price", product?.price)
    formData.append("description", description)
    if (productImage) {
      formData.append("image", productImage)
    }


    console.log(...formData)

    //UPDATE to database
    await dispatch(updateProduct({ id, formData }))
    await dispatch(getProducts())
    navigate("/dashboard")

  }
  return (
    <div>
      {isLoading && <Loader />}
      <h1 className='container'>Edit Product Details</h1>
      <ProductForm
        product={product}
        productImage={productImage}
        imagePreview={imagePreview}
        description={description}
        setDescription={setDescription}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        saveProduct={saveProduct}
      />
    </div>
  )
}

export default EditProduct