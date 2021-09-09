import Uppy from "@uppy/core";
import React from "react";
import Tus from "@uppy/tus";
// import GoogleDrive from '@uppy/google-drive'
import { DragDrop, useUppy,Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

function AvatarPicker() {
  const uppy = useUppy(() => {
    return new Uppy()
      .use(Tus, { endpoint: "https://tusd.tusdemo.net/files" })
      
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