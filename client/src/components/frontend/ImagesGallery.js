import React, { useState, useEffect } from "react";
import axios from "axios";
import { url } from "../../helpers";

const ImagesGallery = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getImages = async () => {
    setIsLoading(true);
    const result = await axios.get(`${url}/upload/landingPage`);
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
    <main className="main-container" style={{marginTop: "20rem"}}>
      {isLoading ? (
        <div>LOADING </div>
      ) : (
        <div>
          {images.map((image) => {
            console.log(image);
            const { name, width, height,imgUrl } = image;
            let isVertical = false;
            if(width <= height) {
                isVertical = true;
            }
            return (
              <div className={isVertical ? "images-row vertical-solo" : "images-row"}>
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
