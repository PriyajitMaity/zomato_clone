import React, { useEffect, useState } from "react";
import { restaurants } from "../../utils/restaurants/restaurants";
import GenerateRestaurant from "../GenerateRestaurant/GenerateRestaurant";
import './Restaurants.css';

const Restaurants = ({ filterType }) => {
  const [allRestaurants, setAllRestaurants] =useState(restaurants);
  // const [displayRestaurants, setDisplayRestaurants] = useState(
  //   restaurants.slice(0, 10)
  // );

  const filterRestaurants =(type) =>{
    if(type === "pureVeg"){
      const vegRestaurant =restaurants.filter((restaurant) =>restaurant.isPureVeg)
      setAllRestaurants(vegRestaurant);
      // setDisplayRestaurants(vegRestaurant.slice(0, 10));
    }
    else if(type === "deliveryTime"){
      const deliveryTimeRestaurants =new Array(...restaurants);
      deliveryTimeRestaurants.sort((a, b) =>a.order.deliveryTime.split('').slice(0, 2).join("") - b.order.deliveryTime.split('').slice(0, 2).join(""));
      setAllRestaurants(deliveryTimeRestaurants);
      // setDisplayRestaurants(deliveryTimeRestaurants.slice(0, 10));
    }
    else if(type === "rating"){
      const ratingRestaurants =new Array(...restaurants);
      ratingRestaurants.sort((a, b) => b.info.rating.rating_text - a.info.rating.rating_text);
      setAllRestaurants(ratingRestaurants);
      // setDisplayRestaurants(ratingRestaurants.slice(0, 10));
    }
    else if(type ==="costLowToHigh"){
      const costLowToHighRestaurants =new Array(...restaurants);
      costLowToHighRestaurants.sort((a, b) =>a.info.cfo.text.split("").slice(1, 3).join("") - b.info.cfo.text.split("").slice(1, 3).join(""));
      setAllRestaurants(costLowToHighRestaurants);
      // setDisplayRestaurants(costLowToHighRestaurants.slice(0, 10));
    }
    else if(type ==="costHighToLow"){
      const costHighToLowRestaurants =new Array(...restaurants);
      costHighToLowRestaurants.sort((a, b) =>b.info.cfo.text.split("").slice(1, 3).join("") - a.info.cfo.text.split("").slice(1, 3).join(""));
      setAllRestaurants(costHighToLowRestaurants);
      // setDisplayRestaurants(costHighToLowRestaurants.slice(0, 10));
    }
    else{
      setAllRestaurants(restaurants);
      // setDisplayRestaurants(restaurants.slice(0, 10));
    }
  }

  useEffect(() =>{
    filterRestaurants(filterType);
  // console.log(restaurants.slice(0, 5));

  }, [filterType]);

  return (
    <div className="restaurants-container">
      <div className="restaurants">
        <h3>Food Delivery Restaurants in Kolkata</h3>
        <div className="all-restaurants">
          {allRestaurants &&
            allRestaurants.map((restaurant, index) => (
              <GenerateRestaurant restaurant={restaurant} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
