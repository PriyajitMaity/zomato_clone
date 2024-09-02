import React,{ useEffect } from "react";
import './GenerateSearchBarItem.scss';
import { Link, useNavigate } from "react-router-dom";
import GenImage from '../GenerateImage/GenImage';

const GenerateSearchBarItem = ({restaurant, setSearchValue, setDisplayBar}) => {
    const navigate =useNavigate();

    const itemHandler =() =>{
        setSearchValue("");
        setDisplayBar(false);
        setTimeout(() => {
            navigate(`${restaurant.order.actionInfo.clickUrl}/${restaurant.info.resId}`);
        }, 0);
    }
 
 return <Link to={''} className="search-bar-item" onClick={itemHandler}>
    <div className="image-container">
        <GenImage url={restaurant.info.image.url} alt={restaurant.info.name} />
    </div>
    <p className="title">{restaurant.info.name}
        <br />
        <span className="text">Restaurant</span>
    </p>
  </Link>
  
};

export default GenerateSearchBarItem;
