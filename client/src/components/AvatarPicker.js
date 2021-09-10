import Uppy from "@uppy/core";
import React from "react";
import Tus from "@uppy/tus";
import XHRUpload from '@uppy/xhr-upload';


import { DragDrop, useUppy,Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

function AvatarPicker() {

  const getCurrentUserToken = () => {
    const  user = JSON.parse(localStorage.getItem("user"));
    const {token} = user
    return token

  }

const headers = {
  authorization: `Bearer ${getCurrentUserToken()}`,
};
  const uppy = useUppy(() => {
    return new Uppy().use(XHRUpload, {
      endpoint: "http://localhost:5000/api/v1/upload/landingPage",
      fieldName: "photo",
      formData: true,
      headers: headers,
    });
  });

  return (
    <Dashboard
      width="90%"
      height="500px"
      note="Images up to 200×200px"
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
  );
}

export default AvatarPicker;