import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { url } from "../helpers";
import axios from "axios";

const SingleProject = () => {
  let { id } = useParams();
    const [project,setProject] = useState({});

  const fecthSingleProjects = async () => {
    try {
      const {data} = await axios.get(`${url}/upload/projects/${id}`);
      setProject(data.data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fecthSingleProjects();
  }, []);

  return (
    <div>
      <h2>{id}</h2>
    </div>
  );
};

export default SingleProject;
