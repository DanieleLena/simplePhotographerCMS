import React, { useRef, useEffect, useState } from "react";
import { Navbar, Footer } from "../components";
import { gsap } from "gsap";
import axios from "axios";
import { url } from "../helpers";
import {Link} from 'react-router-dom';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //   this is to display ref dinamically for gsap
  const projectDomNodes = [];

  const getProjects = async () => {
      setIsLoading(true);
    try {
      const result = await axios.get(`${url}/upload/projects`);
      const projectList = result.data.projects;
      setProjects(projectList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  //gsap animation
  useEffect(() => {
      setIsLoading(false);
    const tl = gsap.timeline({ paused: true });
    tl.to(projectDomNodes, {
      opacity: 1,
      duration: 2,
      stagger: 0.2,
    }).play();
  }, [projects]);

  return (
    <>
      <Navbar />
      <section className="projects-section">
        <h1>Projects</h1>
        {isLoading ? (
          <h1>Loading</h1>
        ) : (
          <div className="grid">
            {projects.map((project, index) => {
              const { _id,name, subtitle, imageArray } = project;

              return (
                <figure
                  key={index}
                  className="effect-lily"
                  //   this is to display ref dinamically for gsap
                  ref={(e) => (projectDomNodes[index] = e)}
                >
                  <img src={imageArray[0].imgUrl} alt={name} />
                  <figcaption>
                    <div>
                      <h2>{name}</h2>
                      <p>{subtitle}</p>
                    </div>
                    <Link to={`/projects/${_id}`}></Link>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Projects;
