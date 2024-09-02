import { configureStore } from "@reduxjs/toolkit";
import cartItemSlice from "./cartItemSlice";
import loginUserSlice from "./loginUserSlice";


const store =configureStore({
    reducer: {
        cart_items: cartItemSlice,
        login_user: loginUserSlice
    },
})
export default store;