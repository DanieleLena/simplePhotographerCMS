import React, { useEffect } from "react";
import { ImageUploader } from "../components";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BiEditAlt } from "react-icons/bi";
import axios from "axios";
import { ProjectsImageUploader, ProjectList } from "../components";
const ManageProjects = () => {
 

  return (
    <main className="dashboard-page">
      <section className="dashboard">
        <div className="dashboard-title dashboard-title-buttons">
          <Link to="/admin">
            <h3>
              {" "}
              <IoIosArrowBack /> Go Back{" "}
            </h3>
          </Link>
          <h1>Manage Projects</h1>
          <Link to="/" target="_blank">
            {" "}
            <button className="custom-btn btn-2">View Live</button>
          </Link>
        </div>
        <p className="dashboard-p">Manage or create your album</p>
        <div className="projects-container">
          <ProjectList />
          <ProjectsImageUploader />
        </div>

        {/* <ImageUploader /> */}
      </section>
    </main>
  );
};

export default ManageProjects;
