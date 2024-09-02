import React, { lazy, Suspense, useState } from "react";
import LazyLoading from "../../components/LazyLoading/LazyLoading.jsx";
import './GenerateImage.css';
import { Link } from "react-router-dom";

const GenerateImage = (props) => {
  const { data } = props;
  const [loading, setLoading] = useState(false);

  const replaceImage = (e) => {
    e.target.src = defaultImage;
    setLoading(false);
  };
  const displayImage = (e) => {
    setLoading(false);
  };

  return (
    <>
      {loading && <LazyLoading />}
      {data && (
        <div className="brand-container">
          <div className="brand-image-div">
            <img
              style={{ display: loading ? "none" : "block" }}
              src={data.imageUrl}
              alt={data.title}
              title={data.title}
              onLoad={displayImage}
              onError={replaceImage}
            />
          </div>
          <span className="brand-title">{data.title}</span>
          <span className="brand-time">{data.time}</span>
        </div>
      )}
    </>
  );
};

export default GenerateImage;
