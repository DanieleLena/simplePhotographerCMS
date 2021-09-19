import React from "react";
import { ImageUploader } from "../components";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BiEditAlt } from "react-icons/bi";

const ManageContact = () => {
  return (
    <main className="dashboard-page">
      <section className="dashboard">
        <div className="dashboard-title dashboard-title-buttons">
          <Link to="/admin">
            <h3>
              <IoIosArrowBack /> Go Back
            </h3>
          </Link>
          <h1>Manage Contact Page</h1>
          <Link to="/" target="_blank">
            <button className="custom-btn btn-2">View Live</button>
          </Link>
        </div>
        <p className="dashboard-p">
          Update and manage your personal image, your description and contact
          details.
        </p>

        <ImageUploader />
      </section>
    </main>
  );
};

export default ManageContact;
