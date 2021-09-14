import React from 'react'
import { ImageUploader } from "../components";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BiEditAlt } from "react-icons/bi";

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
            <h1>
              Upload images <br /> for the Landing Page
            </h1>
            <Link to="/" target="_blank">
              {" "}
              <button className="custom-btn btn-2">View Live</button>
            </Link>
          </div>
          <p className="dashboard-p">
            Add Images to display in your Landing Page, browse or drop files in
            the white box below. Click on the "edit" icon (<BiEditAlt />) to add
            details for each image like preferred position and description.
          </p>

          <ImageUploader />
        </section>
      </main>
    );
}

export default ManageProjects
