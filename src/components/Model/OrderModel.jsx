import React, { useEffect } from "react";
import './OrderModel.scss';
import { HiCheck } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { clearCart } from "../Redux/cartItemSlice";
import { Navigate, useNavigate } from "react-router-dom";

const OrderModel = ({setDisplayPortal}) => {
    const navigate =useNavigate();
    const dispatch =useDispatch();

    useEffect(() =>{
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [])

    const buttonHandler =() =>{
        dispatch(clearCart());
        document.body.style.overflow ="auto";
        navigate('/kolkata');
        setDisplayPortal(false);
    }

  return <div className="model" onClick={buttonHandler}>
    <div className="message">
        <div className="check">
            <HiCheck />
            <div className="moving-element"></div>
        </div>
        <h2 className="heading">Order Successful!!</h2>
        <button className="go-to-home" onClick={buttonHandler}>OK</button>
    </div>
  </div>;
};

export default OrderModel;
