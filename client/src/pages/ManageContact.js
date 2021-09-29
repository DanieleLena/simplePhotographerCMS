import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BiEditAlt } from "react-icons/bi";
import { url } from "../helpers";
import axios from "axios";
//uppy imports
import Uppy from "@uppy/core";
import { Dashboard, useUppy } from "@uppy/react";
import XHRUpload from "@uppy/xhr-upload";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

const ManageContact = () => {
  const [contact, setContact] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [newImage, setNewImage] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const firstRender = useRef(true);

  const fetchContact = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`${url}/upload/contact`);
      const { contact } = data;
      console.log(contact)
      setContact(contact[0]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchContact();
    firstRender.current = false;
  }, []);

  //get the user token from the local storage
  const getCurrentUserToken = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { token } = user;
    return token;
  };
  //create a headers object with the authorization
  const headers = {
    authorization: `Bearer ${getCurrentUserToken()}`,
  };

  const uppy = useUppy(() => {
    return new Uppy({
      restrictions: {
        // maxFileSize: 30,
        maxNumberOfFiles: 1,
      },
    })
      .use(XHRUpload, {
        endpoint: `${url}/upload/contact/profileImage`,
        fieldName: "photo",
        formData: true,
        headers: headers,
      })
      .on("upload-success", (file, response) => {
        setNewImage(response.body.img);
      });
  });

  const handleOnChange = (e) => {
    const value = e.target.value;
    setContact({
      ...contact,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    //start the upload for the images at url/upload/contact/profileImage
    const result = await uppy.upload();
    if (result.failed.length > 0) {
      return;
    }

    setIsUploading(true);
  };

  const upload = async () => {
    const result = await axios.put(`${url}/upload/contact`, contact);
    setIsUploading(false);
  };

  useEffect(() => {
    if(!firstRender){
      setContact({ ...contact, imageProfile: newImage });
    }

  }, [newImage]);

  useEffect(() => {
    if (isUploading) {
      upload();
    }
  }, [contact]);

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
        <div className="contact-flex-container">
          <form className="project-form">
            <div className="project-form-input">
              <label>
                Name: <br></br>
                <input
                  type="text"
                  name="name"
                  value={contact.name}
                  onChange={handleOnChange}
                  required
                />
              </label>

              <label>
                Description:<br></br>
                <textarea
                  type="text"
                  name="description"
                  value={contact.description}
                  onChange={handleOnChange}
                  required
                />
              </label>

              <label>
                Email: <br></br>
                <input
                  type="email"
                  name="email"
                  max="30"
                  value={contact.email}
                  onChange={handleOnChange}
                  required
                />
              </label>
              <label>
                Instagram: <br></br>
                <input
                  type="text"
                  name="instagram"
                  max="30"
                  value={contact.instagram}
                  onChange={handleOnChange}
                  required
                />
              </label>
            </div>
          </form>
          <div className="avatar-section">
            <div className="current-profile">
              <h4>Current profile Image: </h4>
              <div className="current-profile-image">
                <img
                  src="https://res.cloudinary.com/dcwz3c5j2/image/upload/c_scale,w_200/v1632926471/simplePhotographerCMS/contact/pexels-juliana-stein-1898558_olhg20.jpg"
                  width="200"
                />
                <button
                  className="custom-btn btn-2"
                  onClick={() => setIsEdit(!isEdit)}
                >
                  Edit
                </button>
              </div>
            </div>
            {isEdit && (
              <div className="current-profile">
                <h4>Upload Profile Image: </h4>
                <div className="current-profile-image">
                  <Dashboard
                    className="imageUploader"
                    id="Dashboard"
                    width="200px"
                    height="200px"
                    note="Images up to 200×200px"
                    uppy={uppy}
                    hideUploadButton={true}
                    locale={{
                      strings: {
                        // Text to show on the droppable area.
                        // `%{browse}` is replaced with a link that opens the system file selection dialog.
                        dropHereOr: "Drop here or %{browse}",
                        // Used as the label for the link that opens the system file selection dialog.
                        browse: "browse",
                      },
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="btn-contact-container">
          <button
            className="custom-btn btn-2 btn-edit"
            onClick={() => handleSubmit()}
          >
            Save Edit
          </button>
        </div>
      </section>
    </main>
  );
};

export default ManageContact;
