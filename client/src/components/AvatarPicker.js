import Uppy from "@uppy/core";
import React from "react";
import Tus from "@uppy/tus";
import { useState } from "react";
import XHRUpload from "@uppy/xhr-upload";

import { useUppy, Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

function AvatarPicker() {
  const [error, setError] = useState([]);

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
    return new Uppy().use(XHRUpload, {
      endpoint: "http://localhost:5000/api/v1/upload/landingPage",
      fieldName: "photo",
      formData: true,
      headers: headers,
      getResponseError(responseText, response) {
        let newError = JSON.parse(responseText).msg;
        setError((oldArray) => [...oldArray, newError]);
      },
    });
  });

  return (
    <section>
      <h1>Upload images for the Landing Page</h1>
      <Dashboard
        width="90%"
        height="500px"
        note="Images up to 200×200px"
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
      {error &&
        error.map((err, index) => {
          return (
            <p className="uploadError" key={index}>
              {err}
            </p>
          );
        })}
    </section>
  );
}

export default AvatarPicker;
