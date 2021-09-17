import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import {url} from '../helpers'
import LoadingSpin from "react-loading-spin";



const ProjectList = () => {
    const [projectsList,setProjectsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

  const fetchProjects = async () => {
    setIsLoading(true);

    const {data} = await axios.get(`${url}/upload/projects`);
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
            {projectsList.map((project) => {
              const { name, subtitle, description, imageArray, _id, isOpen } =
                project;

              return (
                <li className={isOpen && "li-active"} >
                  <span class="caret" id={_id} onClick={toggleNested}>
                    {name}
                  </span>
                  <ul class={isOpen && "open"}>
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

                    {imageArray.map((img) => {
                      return <li className="nested-item">{img.name}</li>;
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
