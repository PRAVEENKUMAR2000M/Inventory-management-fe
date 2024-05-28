/* this file contains all http request sends to backend */

import axios from "axios"
import config from "../utils/config"

export const BE_URL = config.API_URL


//create new product
//no need to add try catch block instead using createAsyncThunk
export const createProduct = async (formData) => {
    const res = await axios.post(`${BE_URL}/api/products/addproduct`, formData)
    return res.data
}

//get all product
export const getProducts = async () => {
    const res = await axios.get(`${BE_URL}/api/products/getallproduct`)
    return res.data
}

//delete product
export const deleteProduct = async (id) => {
    const res = await axios.delete(`${BE_URL}/api/products/delete/` + id)
    return res.data
}

// Get a Product
const getProduct = async (id) => {
    const res = await axios.get(`${BE_URL}/api/products/getproduct/` + id);
    console.log(res)
    return res.data;
};

//update product
export const updateProduct = async (id, formData) => {
    const res = await axios.patch(`${BE_URL}/api/products/update/` + id, formData)
    return res.data
}


const productService = {
    createProduct, getProducts, deleteProduct, updateProduct, getProduct, updateProduct
}
//createProduct can accessed thro product serv
export default productService