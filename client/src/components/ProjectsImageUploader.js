import Uppy from "@uppy/core";
import React, { useEffect } from "react";
import { useState } from "react";
import XHRUpload from "@uppy/xhr-upload";
import axios from "axios";

import { useUppy, Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { BiEditAlt } from "react-icons/bi";
import LoadingSpin from "react-loading-spin";

import { url } from "../helpers";

const newImageArray = [];

const ProjectsImageUploader = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [project, setProject] = useState({
    name: "",
    subtitle: "",
    description: "",
    imageArray: [],
  });

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
    return new Uppy()

      .use(XHRUpload, {
        endpoint: `${url}/upload/projects/image`,
        fieldName: "photo",
        formData: true,
        headers: headers,

        getResponseError(responseText) {
          let newError = JSON.parse(responseText).msg;
          setResponse((oldArray) => [
            ...oldArray,
            { msg: newError, error: true },
          ]);
        },
      })
      .on("upload-success", (file, response) => {
        console.log(response.body.img);
        newImageArray.push(response.body.img);
        console.log(newImageArray);
        let newSuccess = `The image ${file.name} is added correctly.`;
        setResponse((oldArray) => [
          ...oldArray,
          { msg: newSuccess, error: false },
        ]);
      });
  });

  const handleOnChange = (e) => {
    const value = e.target.value;
    setProject({
      ...project,
      [e.target.name]: value,
    });
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setLoading(true);

    //start the upload for the images at url/upload/projects/images
    const result = await uppy.upload();
    if (result.failed.length > 0) {
      return;
    }

    const newProject = project;
    newProject.imageArray = newImageArray;

    console.log(project);
    try {
      const resultProject = await axios.post(
        `${url}/upload/projects`,
        newProject
      );
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    setIsSuccess(true);
    setLoading(false);
  };

  const addAnotherProject = () => {
    setProject({ name: "", subtitle: "", description: "", imageArray: [] });
    setResponse([]);
    uppy.reset();
    setIsSuccess(false);
  };

  return (
    <>
      <form className="project-form" onSubmit={handleUpload}>
        {loading && (
          <div className="loading-cover">
            <LoadingSpin primaryColor="#74ebd5" />
          </div>
        )}
        <h2>Create a new Project</h2>

        {isSuccess ? (
          <div>
            <h3>Your projects is succesfully upload! Check it live or manage it in the "List of Projects section"</h3>
            <button className="custom-btn another-btn"  onClick={() => addAnotherProject()}>
              Add new Project
            </button>
          </div>
        ) : (
          <div>
            <div className="project-form-input">
              <label>
                Project Name: <br></br>
                <input
                  type="text"
                  name="name"
                  value={project.name}
                  onChange={handleOnChange}
                  required
                />
              </label>

              <label>
                Subtitle: <br></br>
                <input
                  type="text"
                  name="subtitle"
                  max="30"
                  value={project.subtitle}
                  onChange={handleOnChange}
                  required
                />
              </label>
              <label>
                Description:<br></br>
                <textarea
                  type="text"
                  name="description"
                  value={project.description}
                  onChange={handleOnChange}
                />
              </label>
            </div>
            <h3>Insert Images in the project:</h3>
            <p>
              Add Images to display in your project page, browse or drop files
              in the white box below.<br></br> Click on the "edit" icon (
              <BiEditAlt />) to add details for each image like preferred
              position and description.
              <br></br>
              <strong>
                Check the box in the edit section to display the image as
                Thumbnail for your project.
              </strong>
            </p>
            <Dashboard
              className="imageUploader"
              id="Dashboard"
              width="100%"
              height="400px"
              note="Images up to 200×200px"
              hideUploadButton="false"
              metaFields={[
                { id: "name", name: "Name", placeholder: "file name" },
                {
                  id: "thumbnail",
                  name: "thumbnail",
                  render: ({ value, onChange }, h) => {
                    return h("input", {
                      type: "checkbox",
                      onChange: (ev) =>
                        onChange(ev.target.checked ? "on" : "off"),
                      defaultChecked: value === "on",
                    });
                  },
                },
                {
                  id: "position",
                  name: "position",
                  type: "number",
                  placeholder: "specify the order when display",
                },
                {
                  id: "caption",
                  name: "Caption",
                  placeholder: "describe what the image is about",
                },
              ]}
              // assuming `this.uppy` contains an Uppy instance:
              uppy={uppy}
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
            <div className="button-container">
              <button type="submit" className="custom-btn btn-2">
                UPLOAD
              </button>
            </div>
            <div className="response-box">
              {response &&
                response.map((res, index) => {
                  return (
                    <p
                      className={
                        res.error ? "response-error" : "response-success"
                      }
                      key={index}
                    >
                      - {res.msg}
                    </p>
                  );
                })}
            </div>
          </div>
        )}
      </form>
    </>
  );
};

export default ProjectsImageUploader;
