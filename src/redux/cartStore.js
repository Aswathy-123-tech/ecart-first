import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./slices/productSlices";
import wishlistSlice from "./slices/wishlistSlice"
import cartSlice from "./slices/cartSlice"


 const cartStore = configureStore({
    reducer:{
  productReducer:productSlice,
  wishlistReducer:wishlistSlice,
  cartReducer:cartSlice

    }
})

export default cartStore