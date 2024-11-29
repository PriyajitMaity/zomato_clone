import axios from 'axios';

let timeOut;
export const updateCartItems =() =>{
    const loginUser =localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
    const items =localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {};

    if(!loginUser){
        return;
    }
    clearTimeout(timeOut);  
    timeOut = setTimeout(async()=>{
        try{
            const userData ={
                email: loginUser.data.user.email,
                cart: items
            }
            const response = await axios.patch(`http://localhost:5000/api/product/update-cart`, userData);
        }catch(err){
            console.log('update cartItems error', err);
        }
    }, 2000)
}