import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { url } from "../helpers";
import LoadingSpin from "react-loading-spin";
import { MessageModal } from "./";

import { BiTrash } from "react-icons/bi";

const ProjectList = () => {
  const [projectsList, setProjectsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const fetchProjects = async () => {
    setIsLoading(true);

    const { data } = await axios.get(`${url}/get/projects`);
    let newProjectList = data.projects;
    newProjectList = newProjectList.map((project) => {
      return { ...project, isOpen: false };
    });
    setProjectsList(newProjectList);
    setIsLoading(false);
  };

  const deleteSingleProjectImage = async (project_id, image_id) => {
    const { data } = await axios.delete(
      `${url}/upload/projects/image/delete/${project_id}/${image_id}`
    );
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const toggleNested = (e) => {
    const id = e.target.id;
    const projectToToggle = projectsList.map((project) => {
      if (project._id === id) {
        project.isOpen = !project.isOpen;
        return project;
      } else return project;
    });
    setProjectsList(projectToToggle);
  };

  const handleDeleteProject = (name,project_id) => {
    setIsModalOpen(true);
    setSelectedProject({name,project_id});
  };
  useEffect(() => {
    if (deleteConfirm) {
      console.log(`CANCELLARE ${selectedProject}`);
      deleteProject();
    }
  }, [deleteConfirm]);

  const deleteProject = async () => {
    try {
      const result = await axios.delete(
        `${url}/upload/projects/delete/${selectedProject.project_id}`
      );
      fetchProjects();
    } catch (error) {
      console.log("There is no project with this id");
    }

    setDeleteConfirm(false);
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
              {projectsList.map((project, index) => {
                const {
                  name,
                  subtitle,
                  description,
                  imageArray,
                  _id: project_id,
                  isOpen,
                } = project;

                return (
                  <li className={isOpen ? "li-active" : undefined} key={index}>
                    <span
                      className="caret"
                      id={project_id}
                      onClick={toggleNested}
                    >
                      {name}
                      <BiTrash
                        className="caret-icon"
                        onClick={() => handleDeleteProject(name,project_id)}
                      />
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

                      {imageArray.map((img, index) => {
                        return (
                          <li className="nested-item" key={index}>
                            <span
                              className="remove-span"
                              onClick={() =>
                                deleteSingleProjectImage(project_id, img._id)
                              }
                            >
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
         {isModalOpen && (
        <MessageModal
          closeModal={setIsModalOpen}
          isModalOpen={isModalOpen}
          deleteConfirm={deleteConfirm}
          setDeleteConfirm={setDeleteConfirm}
          projectName={selectedProject.name}
        />
      )}
      </div>
    
    </>
  );
};

export default ProjectList;
