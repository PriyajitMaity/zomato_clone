import React from "react";
import './CartItem.scss';
import GenImage from '../GenerateImage/GenImage';
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem } from "../Redux/cartItemSlice";

const CartItem = ({items}) => {
  const cartItems =useSelector(state =>state.cart_items.items)
  const dispatch =useDispatch();

  const handleAddItem =() =>{
    dispatch(addItem(items))
  }
  const handleDeleteItem =(itemId) =>{
    dispatch(deleteItem(itemId));
  }
  

  return <div className="cart-item" id={items.id}>
    <div className="image-name">
      {items.image && <div className="cart-item-image"><GenImage url={items.image} alt={items.name} title={items.name} /></div>}
      <div className="cart-item-name">{items.name}</div>
    </div>
    <div className="buttons-price">
      <div className="cart-item-buttons">
          <button id={items.id} className="minus-btn" onClick={() =>handleDeleteItem(items.id)} >-</button>
          <span className="count">{items.quantity}</span>
          <button id={items.id} className="plus-btn" onClick={handleAddItem}>+</button>
      </div>
      <div className="cart-item-price">₹ { items.price * items.quantity}</div>
    </div>
  </div>;
};

export default CartItem;
