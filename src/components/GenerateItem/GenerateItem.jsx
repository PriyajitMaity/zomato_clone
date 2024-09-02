import React from "react";
import "./GenerateItem.css";
import GenImage from "../GenerateImage/GenImage.jsx";
import { BsStarFill, BsStarHalf } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem } from "../Redux/cartItemSlice.jsx";

const GenerateItem = ({ item }) => {
  const cartItems = useSelector((state) => state.cart_items.items);
  const dispatch = useDispatch();

  const addCartItem = (e) => {
    const id = e.target.id;
    dispatch(addItem({ id, name: item.name, image: item.item_image_thumb_url, price: item.display_price }));
  };

  const removeCartItem =(itemId) =>{
    dispatch(deleteItem(itemId))
  }

const isArray = Array.isArray(cartItems);
const itemInCart = isArray ? cartItems.find((cartItem) => cartItem.id === item.id) : null;

  return (
    <div className="item" id={item.id}>
      <div className="item-images">
        {item.item_image_thumb_url && (
          <div className="main-image">
            {" "}
            <GenImage url={item.item_image_thumb_url} alt={item.name} />
          </div>
        )}
        <img className="tag-image" src={item.item_tag_image} alt="" />
        <div className="add-to-cart">
          {itemInCart?.quantity >= 1 ?  
                <>
                  <button id={item.id} className="minus-btn" onClick={() =>removeCartItem(item.id)}>
                    -
                  </button>
                  <span id={item.id} className="count">
                    {cartItems.find((cartItem) => cartItem.id === item.id)?.quantity}
                  </span>
                  <button id={item.id} className="plus-btn" onClick={addCartItem}>
                    +
                  </button>
                </>
         : 
            <button className="add-button" id={item.id} onClick={addCartItem}>
              ADD
            </button>
          }
        </div>
      </div>
      <div className="item-details">
        <h4 className="item-name">{item.name}</h4>
        
        {item.tag_objects[0] && (
          <div className="tags">
            {item.tag_objects.map((tagObj, index) => {
              return (
                <div
                  key={index}
                  className="tag"
                  style={{
                    backgroundColor: tagObj.title.text === "BESTSELLER" ? "rgb(244, 162, 102)" : "rgb(83, 140, 238)",
                  }}
                >
                  {tagObj.title.text}
                </div>
              );
            })}
          </div>
        )}
        <div className="votes">
          <div className="vote-stars">
            <BsStarFill />
            <BsStarFill />
            <BsStarFill />
            <BsStarHalf />
          </div>
          <span className="vote-text">{item.rating?.total_rating_text}</span>
        </div>
        <div className="item-price">₹{item.display_price}</div>
        <div className="item-description">{item.desc}</div>
      </div>
    </div>
  );
};

export default GenerateItem;
