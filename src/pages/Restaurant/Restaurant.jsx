import React, { useEffect, useState } from "react";
import "./Restaurant.css";
import { useNavigate, useParams } from "react-router-dom";
import { dummyRestaurantsDetails } from "../../utils/restaurantDetails/restaurantDetails.js";
import GenImage from "../../components/GenerateImage/GenImage.jsx";
import { AiFillStar } from "react-icons/ai";
import { GoInfo } from "react-icons/go";
import { MdOutlineArrowBackIos } from "react-icons/md";
import RestaurantItems from "../../components/RestaurantItems/RestaurantItems.jsx";
import Loading from "../../components/Loading/Loading.jsx";
import CartView from "../../components/CartView/CartView.jsx";

const Restaurant = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [restaurantDetails, setRestaurantDetails] = useState({});
  const [displayTimings, setDisplayTimings] = useState(false);

  useEffect(() => {
    const lastDigitOfId = params.id.charAt(params.id.length - 1);
    if (isNaN(lastDigitOfId)) {
      navigate("/");
      return;
    }
    document.title = dummyRestaurantsDetails[lastDigitOfId].page_info?.pageTitle;
    setTimeout(() => {
      setRestaurantDetails(dummyRestaurantsDetails[lastDigitOfId]);
      window.scroll(0, 0);
    }, 3000);

    // console.log(dummyRestaurantsDetails);
  }, []);

  return (
    <div className="restaurant-page">
      {Object.keys(restaurantDetails).length > 0 ? (
        <div className="restaurant-details">
          <div className="restaurant-images">
            <div className="image1">
              <GenImage url={restaurantDetails.page_data?.sections?.SECTION_BASIC_INFO.res_thumb} alt={"image1"} />
            </div>

            <section className="middle-images">
              {restaurantDetails.entities.IMAGES[
                restaurantDetails.page_data.sections.SECTION_IMAGE_CAROUSEL.entities[0].entity_ids[0]
              ] && (
                <div className="image2">
                  <GenImage
                    url={
                      restaurantDetails.entities.IMAGES[
                        restaurantDetails.page_data.sections.SECTION_IMAGE_CAROUSEL.entities[0].entity_ids[0]
                      ]?.thumbUrl
                    }
                    alt={"image2"}
                  />
                </div>
              )}
              {restaurantDetails.entities.IMAGES[
                restaurantDetails.page_data.sections.SECTION_IMAGE_CAROUSEL.entities[0].entity_ids[1]
              ] && (
                <div className="image3">
                  <GenImage
                    url={
                      restaurantDetails.entities.IMAGES[
                        restaurantDetails.page_data.sections.SECTION_IMAGE_CAROUSEL.entities[0].entity_ids[1]
                      ]?.thumbUrl
                    }
                    alt={"image3"}
                  />
                </div>
              )}
            </section>
            {restaurantDetails.entities.IMAGES[
              restaurantDetails.page_data.sections.SECTION_IMAGE_CAROUSEL.entities[0].entity_ids[2]
            ] && (
              <div className="image4">
                <GenImage
                  url={
                    restaurantDetails.entities.IMAGES[
                      restaurantDetails.page_data.sections.SECTION_IMAGE_CAROUSEL.entities[0].entity_ids[2]
                    ]?.thumbUrl
                  }
                  alt={"image4"}
                />
              </div>
            )}
          </div>

          <div className="restaurant-info">
            <div className="name-rating">
              <h1 className="name" title={restaurantDetails.page_data.sections.SECTION_BASIC_INFO.name}>
                {restaurantDetails.page_data.sections.SECTION_BASIC_INFO.name}
              </h1>
              <div className="rating">
                <div className="dining-reviews">
                  <div
                    className="star-rating"
                    style={{
                      backgroundColor:
                        restaurantDetails.page_data.sections.SECTION_BASIC_INFO.rating_new.ratings.DINING.bgColorV2
                          .type,
                    }}
                  >
                    {restaurantDetails.page_data.sections.SECTION_BASIC_INFO.rating_new.ratings.DINING.rating}
                    <AiFillStar />
                  </div>
                  <div className="subtitle">
                    <div className="reviewCount">
                      {restaurantDetails.page_data.sections.SECTION_BASIC_INFO.rating_new.ratings.DINING.reviewCount}
                    </div>
                    <div className="sideSubTitle">
                      {restaurantDetails.page_data.sections.SECTION_BASIC_INFO.rating_new.ratings.DINING.sideSubTitle}
                    </div>
                  </div>
                </div>

                <div className="delivery-reviews">
                  <div
                    className="star-rating"
                    style={{
                      backgroundColor:
                        restaurantDetails.page_data.sections.SECTION_BASIC_INFO.rating_new.ratings.DELIVERY.bgColorV2
                          .type,
                    }}
                  >
                    {restaurantDetails.page_data.sections.SECTION_BASIC_INFO.rating_new.ratings.DELIVERY.rating}
                    <AiFillStar />
                  </div>
                  <div className="subtitle">
                    <div className="reviewCount">
                      {restaurantDetails.page_data.sections.SECTION_BASIC_INFO.rating_new.ratings.DELIVERY.reviewCount}
                    </div>
                    <div className="sideSubTitle">
                      {restaurantDetails.page_data.sections.SECTION_BASIC_INFO.rating_new.ratings.DELIVERY.sideSubTitle}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cuisine-address">
              <div className="cuisine">{restaurantDetails.page_data.sections.SECTION_BASIC_INFO.cuisine_string}</div>
              <div className="address">
                {restaurantDetails.page_data.sections.SECTION_RES_HEADER_DETAILS.LOCALITY.text}
              </div>
            </div>

            <div className="opening-hours">
              Opening Hours
              <GoInfo onMouseOver={() => setDisplayTimings(true)} onMouseLeave={() => setDisplayTimings(false)} />
              <div className="timings" style={{ display: displayTimings && "flex" }}>
                <MdOutlineArrowBackIos />
                {restaurantDetails.page_data.sections.SECTION_BASIC_INFO.timing.customised_timings.opening_hours.map(
                  (everyTime, index) => {
                    return (
                      <div key={index} className="every-timing">
                        {everyTime.days}: {everyTime.timing}
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            <hr />
          </div>
          <RestaurantItems
            menuList={restaurantDetails.page_data.order.menuList}
            orderDetails={restaurantDetails.page_data.orderDetails}
          />
          <hr className="lastDivider" />
        </div>
      ) : (
        <Loading />
      )}

      {/* CartView */}
      <CartView />
    </div>
  );
};
export default Restaurant;
