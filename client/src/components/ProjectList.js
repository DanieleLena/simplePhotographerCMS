import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import {url} from '../helpers'
import LoadingSpin from "react-loading-spin";

import {BiTrash} from "react-icons/bi"
 



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

 const deletePopUp = (project_id, image_id) => {
   
 }; 
const deleteSingleProjectImage = async (project_id, image_id) => {
  const {data} = await axios.delete(`${url}/upload/projects/image/delete/${project_id}/${image_id}`);
  fetchProjects();  
};

    useEffect(()=> {
  fetchProjects();
    },[]);
    // useEffect(()=> {
    //   setIsLoading(false);
    // },[])

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
              const { name, subtitle, description, imageArray, _id : project_id, isOpen } =
                project;

              return (
                <li className={isOpen ? "li-active" : undefined} key={index}>
                  <span className="caret" id={project_id} onClick={toggleNested}>
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
                      return (
                        <li className="nested-item" key={index}>
                          <span className="remove-span" onClick={()=> deleteSingleProjectImage(project_id,img._id)}>
                            <BiTrash />
                          </span>
                          {img.name}
                        </li>
                      );
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
