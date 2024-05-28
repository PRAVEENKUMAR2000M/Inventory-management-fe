import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
//createAsyncThunk - helps to make http req from redux
import { toast } from 'react-toastify';
import productService from '../../../services/productService';

//initialize state 
const initialState = {
  product: null,
  products: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  catagory: [],
}

//Create new product
export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunkAPI) => {
    try {
      return await productService.createProduct(formData)
    } catch (error) {
      const message = (
        error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//get allproduct
export const getProducts = createAsyncThunk(
  "products/getall",
  async (_, thunkAPI) => {
    try {
      return await productService.getProducts()
    } catch (error) {
      const message = (
        error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

//delete product
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id)
    } catch (error) {
      const message = (
        error.response && error.response.data && error.response.data.message) || error.message || error.toString()
      toast.error(message)
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get a product
export const getProduct = createAsyncThunk(
  "products/getProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }, thunkAPI) => {
    try {
      return await productService.updateProduct(id, formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//create reducers, here we calculate stats for product summary
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE(state, action) {
      const products = action.payload
      const array = []
      products.map((item) => {
        const { price, quantity } = item
        const productValue = price * quantity
        return array.push(productValue)
      })
      const totalValue = array.reduce((a, b) => {
        return a + b
      }, 0)
      state.totalStoreValue = totalValue
    },
    CALC_OUTOFSTOCK(state, action) {
      const products = action.payload
      const array = []
      products.map((item) => {
        const { quantity } = item
        return array.push(quantity)
      })
      let count = 0
      array.forEach((number) => {
        if (number === 0 || number === "0") {
          count += 1
        }
      })
      state.outOfStock = count
    },
    CALC_CATAGORY(state, action) {
      const products = action.payload
      const array = []
      products.map((item) => {
        const { catagory } = item
        return array.push(catagory)
      })
      const uniqueCat = [...new Set(array)]
      state.catagory = uniqueCat
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        console.log(action.payload)
        state.products.push(action.payload)
        toast.success("Product added successfully")
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        console.log(action.payload)
        state.products = (action.payload)
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        toast.success("Product Deleted Successfully")

      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
        toast.error(action.payload)
      })
      .addCase(getProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = action.payload;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product updated successfully");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })
  }
});

export const { CALC_STORE_VALUE, CALC_OUTOFSTOCK, CALC_CATAGORY } = productSlice.actions

export const selectIsLoading = (state) => state.product.isLoading
export const selectTotalStoreValue = (state) => state.product.totalStoreValue
export const selectOutOfStock = (state) => state.product.outOfStock
export const selectCatagory = (state) => state.product.catagory
export const selectProduct = (state) => state.product.product

export default productSlice.reducer