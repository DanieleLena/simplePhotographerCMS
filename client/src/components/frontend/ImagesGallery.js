import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../helpers";
import {Loading} from "../../components";

const ImagesGallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getImages = async () => {
    setIsLoading(true);
    const result = await axios.get(`${url}/get/landingPage`);
    const newImages = result.data.images;
    setImages(newImages);
  };

  useEffect(() => {
    getImages();
  }, []);

  useEffect(() => {
    setIsLoading(false);
  }, [images]);

  return (
    <main className="main-container" >
      {isLoading ? (
        
        <Loading />
      ) : (
        <div>
          {images.map((image,index) => {
            const { name, width, height,imgUrl } = image;
            let isVertical = false;
            if(width <= height) {
                isVertical = true;
            }
            return (
              <div  key={index} className={isVertical ? "images-row vertical-solo" : "images-row"}>
               <img src={imgUrl} alt={name} />
              </div>
            );
          })}
        </div>
      )}
     
    </main>
  );
};

export default ImagesGallery;
