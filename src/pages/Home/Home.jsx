import React, { useState } from "react";
import "./Home.scss";
import { MdArrowForwardIos, MdArrowBackIos, MdKeyboardArrowUp } from 'react-icons/md';

import OrderType from "../../components/OrderType/OrderType";
import FoodFilters from "../../components/FoodFilters/FoodFilters";
import biryani from "../../utils/images/inspirationFood/biryani.avif";
import pizza from "../../utils/images/inspirationFood/pizza.avif";
import chicken from "../../utils/images/inspirationFood/chicken.webp";
import burger from "../../utils/images/inspirationFood/burger.avif";
import cake from "../../utils/images/inspirationFood/cake.avif";
import rolls from "../../utils/images/inspirationFood/rolls.avif";
import friedRice from "../../utils/images/inspirationFood/friedRice.avif";
import thali from "../../utils/images/inspirationFood/thali.avif";
import noodles from "../../utils/images/inspirationFood/noodles.avif";
import iceCream from "../../utils/images/inspirationFood/iceCream.avif";
import momos from "../../utils/images/inspirationFood/momos.avif";
import idli from "../../utils/images/inspirationFood/idli.avif";
import GenerateImage from "../../components/GenerateImage/GenerateImage";

import wowMomo from "../../utils/images/brands/wowMomo.avif"
import dominosPizza from "../../utils/images/brands/dominosPizza.avif"
import kfc from "../../utils/images/brands/kfc.avif"
import burgerKing from "../../utils/images/brands/burgerKing.avif"
import arsalan from "../../utils/images/brands/arsalan.avif"
import pizzaHut from "../../utils/images/brands/pizzaHut.avif"
import kwalityWalls from "../../utils/images/brands/kwalityWalls.avif"
import laPinozPizza from "../../utils/images/brands/laPinozPizza.avif"
import subway from "../../utils/images/brands/subway.avif"
import edabba from "../../utils/images/brands/edabba.avif"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Restaurants from "../../components/Restaurants/Restaurants";
import { Link } from "react-router-dom";

 export const inspirationFood = [
  {
    imageUrl: biryani,
    title: "Biryani",
    page_url: "/kolkata/arsalan-park-street-area/order/20795",
  },
  {
    imageUrl: pizza,
    title: "Pizza",
    page_url: "/kolkata/dominos-pizza-1-bara-bazar/order/18733272",
  },
  {
    imageUrl: chicken,
    title: "Chicken",
    page_url: "/kolkata/kfc-new-market-area/order/207376",
  },
  {
    imageUrl: burger,
    title: "Burger",
    page_url: "/kolkata/wow-momo-2-sealdah-area/order/19231719",
  },
  {
    imageUrl: rolls,
    title: "Rolls",
    page_url: "/kolkata/india-restaurant-kidderpore/order/207471",
  },
  {
    imageUrl: friedRice,
    title: "Fried Rice",
    page_url: "/kolkata/jai-hind-dhaba-paddapukur/order/20273",
  },
  {
    imageUrl: thali,
    title: "Thali",
    page_url: "/kolkata/daily-bhoj-topsia/order/194606538",
  },
  {
    imageUrl: noodles,
    title: "Noodles",
    page_url: "/kolkata/india-restaurant-kidderpore/order/207471",
  },
  {
    imageUrl: cake,
    title: "Cake",
    page_url:
      "/kolkata/kwality-walls-frozen-dessert-and-ice-cream-shop-college-street/order/203595354",
  },
  {
    imageUrl: iceCream,
    title: "Ice Cream",
    page_url:
      "/kolkata/kwality-walls-frozen-dessert-and-ice-cream-shop-college-street/order/203595354",
  },
  {
    imageUrl: momos,
    title: "Momos",
    page_url: "/kolkata/wow-momo-2-sealdah-area/order/19231719",
  },
  {
    imageUrl: idli,
    title: "Idli",
    page_url: "/kolkata/daily-bhoj-topsia/order/194606538",
  },
];

const brands =[
  { imageUrl: wowMomo, title: "WOW! Momo", time: "24 min", page_url: "/kolkata/wow-momo-2-sealdah-area/order/19231719" },
  { imageUrl: dominosPizza, title: "Domino's Pizza", time: "40 min", page_url: "/kolkata/dominos-pizza-1-bara-bazar/order/18733272" },
  { imageUrl: kfc, title: "KFC", time: "31 min", page_url: "/kolkata/kfc-new-market-area/order/207376" },
  { imageUrl: burgerKing, title: "Burger King", time: "28 min", page_url: "/kolkata/burger-king-new-market-area/order/19867842" },
  { imageUrl: arsalan, title: "Arsalan", time: "35 min", page_url: "/kolkata/arsalan-park-street-area/order/20795" },
  { imageUrl: pizzaHut, title: "Pizza Hut", time: "33 min", page_url: "/kolkata/pizza-hut-howrah-station-area-howrah/order/249812" },
  { imageUrl: kwalityWalls, title: "Kwality Wall’s Frozen Dessert and Ice Cream Shop", time: "38 min", page_url: "/kolkata/kwality-walls-frozen-dessert-and-ice-cream-shop-college-street/order/203595354" },
  { imageUrl: laPinozPizza, title: "La Pino'z Pizza", time: "30 min", page_url: "/kolkata/la-pinoz-pizza-camac-street-area/order/195702102" },
  { imageUrl: subway, title: "Subway", time: "27 min", page_url: "/kolkata/subway-theatre-road/order/18398878" },
  { imageUrl: edabba, title: "Edabba", time: "29 min", page_url: "/kolkata/edabba-esplanade/order/19137878" },
]


const Home = ({ filterType, setFilterType }) => {

  const[goToTop, setGoToTop] =useState(false);

  window.addEventListener("scroll", () =>{
    window.scrollY > 1000 ? setGoToTop(true) : setGoToTop(false)
  })

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <>
      <MdArrowForwardIos className={className} onClick={onClick} style={{ ...style,color: "black", fontSize: '10px' }} />
      </>
    );
  }
  
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <>
      <MdArrowBackIos className={className} onClick={onClick} style={{ ...style, fontSize: '30px', color: 'black' }} />
      </>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    swipeToSlide: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive:[
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 620,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
          dots: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        }
      }
    ]
  };
  return (
    <div className="home">
      <OrderType />
      <FoodFilters filterType={filterType} setFilterType={setFilterType} />

      {/* inspiration first Order */}
      {!filterType && (
        <div className="inspiration-foods-container">
          <div className="inspiration-foods-items">
            <h3>Inspiration for your first order</h3>            
            <Slider {...settings}>
             
              {inspirationFood.map((item, index) => {                
                return(
                  <Link to={item.page_url} key={index} className="items">
                  <GenerateImage data={item}  />
                  </Link>
                );
              })}
             
            </Slider>
          </div>
        </div>
      )}

      {/* brands for you */}
      {!filterType && (
        <div className="brands-container">
          <div className="brands-items">
            <h3>Top brands for you</h3>
            <section >
              <Slider {...settings}>
              {brands.map((brand, index) => {
                return (
                  <Link to={brand.page_url} key={index} className="items">
                    <GenerateImage data={brand} />
                  </Link>
                );
              })}
              </Slider>
            </section>
          </div>
        </div>
      )}

      {/* Restaurents */}
      <Restaurants filterType={filterType} />

      {/* Go To Top Btn */}
      <div className="goToTop-btn" 
        style={{
          opacity: goToTop && 1, visibility : goToTop && "visible"
        }}
        onClick={() =>window.scrollTo(0, 0)}><MdKeyboardArrowUp /></div>
    </div>
  );
};

export default Home;
