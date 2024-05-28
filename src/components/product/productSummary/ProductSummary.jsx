import React, { useEffect } from 'react'
import './productSummary.css'
import Infobox from '../../infobox/Infobox'
import { AiFillDollarCircle } from 'react-icons/ai'
import { BsCart4, BsCartX } from 'react-icons/bs'
import { BiCategory } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { CALC_STORE_VALUE, selectTotalStoreValue, CALC_OUTOFSTOCK , selectOutOfStock, CALC_CATAGORY, selectCatagory} from '../../../redux/features/product/productSlice'

//create icons
const earningIcon = <AiFillDollarCircle size={40} color='#fff' />
const productIcon = <BsCart4 size={40} color='#fff' />
const outOfStockIcon = <BsCartX size={40} color='#fff' />
const catagoryIcon = <BiCategory size={40} color='#fff' />


// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({products}) => {

  const dispatch = useDispatch()

  //get calculated values from productSlie reducers thro useSelecor
  const totalStoreValue = useSelector(selectTotalStoreValue)
  const outOfStock = useSelector(selectOutOfStock)
  const catagory = useSelector(selectCatagory)

  //use useEffect to dispatch the action
  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products))
    dispatch(CALC_OUTOFSTOCK(products))
    dispatch(CALC_CATAGORY(products))
  },[dispatch, products])


  return (
    <div className='product-summary'>
      <h3>Inventory Stats</h3>
      <div className="info-summary">

        <Infobox
          icon={productIcon}
          title={"Total Products"}
          count={products.length}
          bgColor="card1"
        />
        <Infobox
          icon={earningIcon}
          title={"Total Store Value"}
          count={`$ ${formatNumbers(totalStoreValue.toFixed(2))}` }
          bgColor="card2"
        />
        <Infobox
          icon={outOfStockIcon}
          title={"Out of Stock"}
          count={outOfStock}
          bgColor="card3"
        />
        <Infobox
          icon={catagoryIcon}
          title={"All Catagories"}
          count={catagory.length}
          bgColor="card4"
        />
      </div>
    </div>
  )
}

export default ProductSummary