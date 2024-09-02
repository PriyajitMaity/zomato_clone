import React, { useState } from "react";
import './OrderType.css';
import delivery from '../../utils/images/orderType/delivery.png';
import deliveryBW from '../../utils/images/orderType/deliveryBW.webp';
import diningOut from '../../utils/images/orderType/diningOut.avif';
import diningOutBW from '../../utils/images/orderType/diningOutBW.png';
import nightlife from '../../utils/images/orderType/nightlife.webp';
import nightlifeBW from '../../utils/images/orderType/nightlifeBW.png';

const OrderType = () => {
    const[currOption, setCurrOption] =useState("delivery")

  return (
    <div className="orderType-container">
        <div className="orderType">

            {/* Delivery */}
            <div className="options-container" onClick={() =>setCurrOption("diningOut")}>
                <div className="options">
                    <div className="img-div" style={{ backgroundColor: currOption ==='diningOut' && "rgb(252, 238, 192)"}}>
                        <img className="option-image" src={currOption=='diningOut' ? diningOut : diningOutBW} alt="DiningOut" />
                    </div>
                    <h2 className="option-title" style={{ color: currOption === "diningOut" && "rgb(239, 79, 95)" }}>Dining Out</h2>
                </div>
                <hr className="option-underline" style={{ transform: currOption === "diningOut" && 'scaleX(1)' }} />
            </div>

            {/* Dining Out */}  
            <div className="options-container" onClick={() =>setCurrOption("delivery")}>
                <div className="options">
                    <div className="img-div" style={{ backgroundColor : currOption=== 'delivery' && "rgb(252, 238, 192)" }}>
                        <img className="option-image" src={currOption=='delivery' ? delivery : deliveryBW} alt="Delivery" />
                    </div>
                    <h2 className="option-title" style={{ color: currOption === "delivery" && "rgb(239, 79, 95)" }}>Delivery</h2>
                </div>
                <hr className="option-underline" style={{ transform: currOption === "delivery" && 'scaleX(1)' }} />
            </div>

            {/* Night life */}
            <div className="options-container" onClick={() =>setCurrOption("nightlife")}>
                <div className="options">
                    <div className="img-div" style={{ backgroundColor: currOption==='nightlife' && "rgb(252, 238, 192)" }}>
                        <img className="option-image" src={currOption=='nightlife' ? nightlife : nightlifeBW} alt="NightLife" />
                    </div>
                    <h2 className="option-title" style={{ color: currOption === "nightlife" && "rgb(239, 79, 95)" }}>Nightlife</h2>
                </div>
                <hr className="option-underline" style={{ transform: currOption === "nightlife" && 'scaleX(1)' }} />
            </div>
        </div>

    </div>
  )
};

export default OrderType;
