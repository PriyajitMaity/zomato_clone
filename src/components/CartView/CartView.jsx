import React from "react";
import './CartView.scss';
import { FiShoppingBag } from 'react-icons/fi';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartView = () => {
  const cartItems =useSelector(state =>state.cart_items.items);
  const navigate =useNavigate();
  
  const total =Object.keys(cartItems).reduce((sum, item) =>{
    const ele =cartItems[item];
    return sum + (ele.price * ele.quantity);
  }, 0);
    
  
  return <>{ Object.keys(cartItems).length > 0 && <div className="cart-view-container">
    <div className="cart-view">
      <section className="left-section">
        <span className="item-number">{Object.keys(cartItems).length}{" "}{Object.keys(cartItems).length ===1 ? 'Item' : 'Items'}</span>
        <span className="price">₹ {total}</span>
      </section>
      <button className="view-cart" onClick={() =>navigate('/checkout' )} >
        View Cart
        <FiShoppingBag/>
      </button>
    </div>
  </div>
  }
  </>
};

export default CartView;
