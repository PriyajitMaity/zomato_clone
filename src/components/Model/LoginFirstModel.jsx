import React, { useEffect } from "react";
import './OrderModel.scss';
import { BsExclamationLg } from 'react-icons/bs';

const LoginFirstModel = ({setLoginFirst}) => {

    useEffect(() =>{
        document.body.style.overflow ="hidden";
        return () => {
            document.body.style.overflow ="auto";
        };
    }, []);
  return <div className="model" onClick={() =>setLoginFirst(false)}>
    <div className="message" onClick={(e) =>e.stopPropagation()}>
        <div className="exclamation">
            <BsExclamationLg />
        </div>
        <h2 className="heading">Please login first!</h2>
        <p className="text">After login you can able to order</p>
        <button className="cancel" onClick={() =>setLoginFirst(false)}>cancel</button>
    </div>
  </div>;
};

export default LoginFirstModel;
