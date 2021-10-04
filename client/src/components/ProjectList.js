import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import {url} from '../helpers'
import LoadingSpin from "react-loading-spin";
import {ImCross} from 'react-icons/im'



const ProjectList = () => {
    const [projectsList,setProjectsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

  const fetchProjects = async () => {
    setIsLoading(true);

    const {data} = await axios.get(`${url}/get/projects`);
    let newProjectList = data.projects;
     newProjectList = newProjectList.map((project) => {
      return { ...project,isOpen: false}
    });
    setProjectsList(newProjectList);
     setIsLoading(false);
  }



    useEffect(()=> {
  fetchProjects();
    },[])

  const toggleNested = (e) => {
    const id = e.target.id;
      const projectToToggle = projectsList.map((project) => {
        if (project._id === id){
          project.isOpen = !project.isOpen;
          return project;
        } else 
        return project;
      });
      setProjectsList(projectToToggle);
      

};  


return (
  <>
    <div className="projects-list">
      <h2>List of projects:</h2>
      {isLoading ? (
        <div className="loading-cover">
          <LoadingSpin primaryColor="#74ebd5" />
        </div>
      ) : (
        <div className="list-container">
          <ul id="list">
            {projectsList.map((project,index) => {
              const { name, subtitle, description, imageArray, _id, isOpen } =
                project;

              return (
                <li className={isOpen ? "li-active" : undefined} key={index}>
                  <span className="caret" id={_id} onClick={toggleNested}>
                    {name}
                  </span>
                  <ul className={isOpen ? "open" : undefined}>
                    <p>
                      <strong>Subtitle:</strong> {subtitle}
                    </p>
                    <p>
                      <strong>Description:</strong>
                      {description}
                    </p>
                    <p>
                      <strong>Image List:</strong>
                    </p>

                    {imageArray.map((img,index) => {
                      return <li className="nested-item" key={index}>{img.name}<span><ImCross/></span></li>;
                    })}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  </>
);
}

export default ProjectList
