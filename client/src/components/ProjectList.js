import React from 'react'
import axios from 'axios';
import { useState,useEffect } from 'react';
import {url} from '../helpers'


const ProjectList = () => {
    const [projectsList,setProjectsList] = useState([]);

  const fetchProjects = async () => {

    const {data} = await axios.get(`${url}/upload/projects`);
    const newProjectList = data.projects;
    setProjectsList(newProjectList);
  }

    useEffect(()=> {
  fetchProjects();
    },[])

  const toggleNested = (e) => {
    console.log(e.target.childNodes);
  };    
  return (
    <div className="projects-list">
      <h2>List of projects:</h2>
      <div className="list-container">
        <ul id="list">
          {projectsList.map((project) => {
            const { name,imageArray } = project;

            return (
              <li>
                <span class="caret" onClick={toggleNested}>
                  {name}
                </span>
                <ul class="nested">
                    {imageArray.map((img)=>{
                        return <li>{img.name}</li>;

                    })}
                </ul>
              </li>
            );
          })}
         
        </ul>
      </div>
    </div>
  );
}

export default ProjectList
