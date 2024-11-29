import { createSlice } from "@reduxjs/toolkit"

// Load cart items from localStorage if available
const loadUserFromLocalStorage = () => {
    try {
        const serializedUser = localStorage.getItem('user');
        if (serializedUser === null) {
            return [];
        }
        return JSON.parse(serializedUser);
    } catch (e) {
        console.warn('Could not load user from localStorage:', e);
        return [];
    }
};

// Save cart items to localStorage
const saveUserToLocalStorage = (items) => {
    try {
        const serializedUser = JSON.stringify(items);
        localStorage.setItem('user', serializedUser);
    } catch (e) {
        console.warn('Could not save user to localStorage:', e);
    }
};

const initialState ={
    user: loadUserFromLocalStorage(),
}

export const loginUserSlice =createSlice({
    name: 'login_user',
    initialState, 
    reducers:{
        login: (state, {payload}) =>{
            state.user =payload
            saveUserToLocalStorage(state.user);
        },
        logout: (state) =>{
            state.user = null
            localStorage.removeItem('user');
        }    
    }
})

export const { login, logout } =loginUserSlice.actions;
export default loginUserSlice.reducer;