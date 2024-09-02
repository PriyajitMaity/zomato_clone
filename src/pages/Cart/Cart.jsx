import "./Cart.scss";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/CartItem/CartItem";
import { clearCart } from "../../components/Redux/cartItemSlice";
import GenImage from "../../components/GenerateImage/GenImage";
import emptyCart from "../../utils/images/emptyCart.webp";
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import LoginFirstModel from "../../components/Model/LoginFirstModel";
import OrderModel from "../../components/Model/OrderModel";

const Cart = () => {
  const [displayPortal, setDisplayPortal] =useState(false);
  const [loginFirst, setLoginFirst] =useState(false)

  const CartItems = useSelector((state) => state.cart_items.items);
  const loginUser =useSelector(state =>state.login_user.user);
  const dispatch = useDispatch();
  const navigate =useNavigate();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleOrder=() =>{
    if(!loginUser){
      setLoginFirst(true);
      return;
    }
    setDisplayPortal(true);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title= "Checkout | Zomato"
  }, []);
  

  return (
    <div className="cart-page">
      <div className="cart-details">
        {Object.keys(CartItems).length ? (
          <>
            <div className="cart-items">
              {Object.values(CartItems).map((items) => (
                <CartItem items={items} key={items.id} />
              ))}
            </div>

            <div className="total-container">
              <div className="total">
                <span className="text">Total Amount</span>
                <span className="amount">
                  ₹
                  {Object.values(CartItems).reduce((total, item) => {
                    total = total + item.price * item.quantity;
                    return parseFloat((total).toFixed(2));
                  }, 0)}
                </span>
              </div>
              <hr className="line" />
            </div>
            <div className="buttons">
              <button className="clear-btn" onClick={handleClearCart}>Clear Cart</button>
              <button className="order-btn" onClick={handleOrder}>Order</button>
            </div>
            {displayPortal && createPortal(<OrderModel setDisplayPortal={setDisplayPortal} />, document.getElementById("portal"))}
            {loginFirst && createPortal(<LoginFirstModel setLoginFirst={setLoginFirst}/>, document.getElementById("portal"))}
          </>
        ) : (
          <div className="empty-cart">
            <div className="empty-cart-image">
                <GenImage url={emptyCart} />
              </div>
              <h1 className="heading">Your Cart is Empty </h1>
              <div className="text">You can got to home page for more restaurants</div>
              <button className="go-to-home" onClick={() =>navigate('/kolkata')}>see restaurants near you</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
