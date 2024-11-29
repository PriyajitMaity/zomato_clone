import { createSlice } from '@reduxjs/toolkit';
import { updateCartItems } from '../../utils/updateCartItems/updateCartItems';

// Load cart items from localStorage if available
const loadCartFromLocalStorage = () => {
    try {
        const serializedCart = localStorage.getItem('cart');
        if (serializedCart === null) {
            return [];
        }
        return JSON.parse(serializedCart);
    } catch (e) {
        console.warn('Could not load cart from localStorage:', e);
        return [];
    }
};

// Save cart items to localStorage
const saveCartToLocalStorage = (items) => {
    try {
        const serializedCart = JSON.stringify(items);
        localStorage.setItem('cart', serializedCart);
        updateCartItems();
    } catch (e) {
        console.warn('Could not save cart to localStorage:', e);
    }
};

const initialState ={
    items :loadCartFromLocalStorage(),
}

export const cartItemSlice =createSlice({
    name: "cart_items",
    initialState,
    reducers:{
        addItem(state, {payload}){
            const newItemId= payload.id;
            const existItem =state.items.find((item) =>item.id ===newItemId);
            if(existItem){
                existItem.quantity++;         

            }else{
                state.items.push({...payload, quantity :1});
            }
            saveCartToLocalStorage(state.items);
            updateCartItems();
        },
        deleteItem(state, {payload}){
            state.items =state.items.map((item) =>{
                if(item.id === payload){
                    item.quantity--;
                }
                return item;
            }).filter(item =>item.quantity !== 0);
            saveCartToLocalStorage(state.items); 
            updateCartItems();
        },
        clearCart(state){
            state.items=[];
            saveCartToLocalStorage(state.items);
            updateCartItems();
        }
        
    }
})

export const { addItem, deleteItem, clearCart } =cartItemSlice.actions;
export default cartItemSlice.reducer;