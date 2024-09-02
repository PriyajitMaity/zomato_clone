import './FoodFilters.css';
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";

const FoodFilters = ({ filterType, setFilterType }) => {
  const [selectedFilter, setSelectedFilter] = useState(filterType);

  const handleFilterChange = (e) => {
    if(selectedFilter ===e.target.id){
      setSelectedFilter("");
      setFilterType("");
    }else{
      setSelectedFilter(e.target.id);
      setFilterType(e.target.id);
    }
  };

  return (
    <div className="food-filters-containers">
      <div className="food-filters">
        {selectedFilter === "pureVeg" ? (
          <div className="filter-option selected" id={"pureVeg"} onClick={handleFilterChange} >
            <span id="pureVeg">Pure Veg</span>
            <RxCross1 id='pureVeg' />
          </div>
        ) : (
          <div className="filter-option" id={"pureVeg"} onClick={handleFilterChange}>
            Pure Veg
          </div>
        )}

        {selectedFilter === "deliveryTime" ? (
          <div className="filter-option selected" id={"deliveryTime"} onClick={handleFilterChange}>
            <span id="deliveryTime">Delivery Time</span>
            <RxCross1 id='deliveryTime' />
          </div>
        ) : (
          <div className="filter-option" id={"deliveryTime"} onClick={handleFilterChange}>Delivery Time</div>
        )}

        {selectedFilter === "rating" ? (
          <div className="filter-option selected" id={"rating"} onClick={handleFilterChange}>
            <span id="rating">Rating</span>
            <RxCross1 id='rating' />
          </div>
        ) : (
          <div className="filter-option" id={"rating"} onClick={handleFilterChange}>
            Rating
          </div>
        )}

        {selectedFilter === "costLowToHigh" ? (
          <div className="filter-option selected" id={"costLowToHigh"} onClick={handleFilterChange}>
            <span id="costLowToHigh">Cost :Low to High</span>
            <RxCross1 id='costLowToHigh' />
          </div>
        ) : (
          <div className="filter-option" id={'costLowToHigh'} onClick={handleFilterChange}>Cost : Low to High</div>
        )}

        {selectedFilter === "costHighToLow" ? (
          <div className="filter-option selected" id={"costHighToLow"} onClick={handleFilterChange}>
            <span id="costHighToLow">Cost : High to Low</span>
            <RxCross1  id='costHighToLow'/>
          </div>
        ) : 
          <div className="filter-option" id={"costHighToLow"} onClick={handleFilterChange}>Cost : High to Low</div>
        }
      </div>
    </div>
  );
};

export default FoodFilters;
