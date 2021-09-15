import Uppy from "@uppy/core";
import React from "react";
import { useState } from "react";
import XHRUpload from "@uppy/xhr-upload";
import axios from "axios";

import { useUppy, Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";
import { url } from "../helpers";


const ProjectsImageUploader = () => {
  const [response, setResponse] = useState([]);
  const [images,setImages] = useState([]);
  const imageArray = [];

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
      .on("upload-success", (file,response,) => {

        console.log(response);
        
        imageArray.push(response.body.img);
        let newSuccess = `The image ${file.name} is added correctly.`;
        setResponse((oldArray) => [
          ...oldArray,
          { msg: newSuccess, error: false },
        ]);
      });
  });

  const handleUpload = async () => {
    //to get from form
    const name = "progetto 1";
    const description = "lorem dkdkdk kdkddkdkdkdkdkd";

    if(!name) {
      console.log("errore");
    }
    //start the upload for the images at url/upload/projects/images
    const result = await uppy.upload();
    console.log(imageArray);

    const newProject = {
      name,
      description,
      imageArray
    }

    const resultProject = axios.post(`${url}/upload/projects`, newProject);

  };

  return (
    <>
      <Dashboard
        className="imageUploader"
        id="Dashboard"
        width="500px"
        height="500px"
        note="Images up to 200×200px"
        hideUploadButton="false"
        metaFields={[
          { id: "name", name: "Name", placeholder: "file name" },
          {
            id: "position",
            name: "position",
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
      <div>
        <button onClick={handleUpload}>UPLOAD</button>
      </div>
      <div className="response-box">
        {response &&
          response.map((res, index) => {
            return (
              <p
                className={res.error ? "response-error" : "response-success"}
                key={index}
              >
                - {res.msg}
              </p>
            );
          })}
      </div>
    </>
  );
};

export default ProjectsImageUploader;
