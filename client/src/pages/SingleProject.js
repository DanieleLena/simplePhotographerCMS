import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { url } from "../helpers";
import { Navbar } from "../components";
import axios from "axios";

const SingleProject = () => {
    let { id } = useParams();
    const [project,setProject] = useState({});
    const [isLoading,setIsLoading] = useState(true);

  const fecthSingleProjects = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.get(`${url}/upload/projects/${id}`);
      setProject(data.data);
      console.log(project);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fecthSingleProjects();
  }, []);
  
 
  return (
    <>
      <Navbar />
      <section className="project-body main-container">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <div class="project-title">
              <h1>{project.name}</h1>
              <p>{project.description}</p>
            </div>
            <div>
              {project.imageArray.map((image) => {
                console.log(image);
                const { name, width, height, imgUrl } = image;
                let isVertical = false;
                if (width <= height) {
                  isVertical = true;
                }
                return (
                  <div
                    className={
                      isVertical ? "images-row vertical-solo" : "images-row"
                    }
                  >
                    <img src={imgUrl} alt={name} />
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default SingleProject;
