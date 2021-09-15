import React, { useEffect } from 'react'
import { ImageUploader } from "../components";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BiEditAlt } from "react-icons/bi";
import axios from 'axios';
import { ProjectsImageUploader } from '../components';
const ManageProjects = () => {

//   const [projectsList,setProjectsList] = useState([]);

// const fetchProjects = async () => {
  
//   const projects = await axios.get('http://localhost:5000/projects');
  
// }

//   useEffect(()=> {
// fetchProjects();
//   },[])

const toggleNested = (e) => {

  console.log(e.target.childNodes);
  


}
   
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
            <div className="projects-list">
              <h2>List of projects:</h2>
              <div className="list-container">
                <ul id="list">
                  <li>
                    <span class="caret" onClick={toggleNested}>Beverages</span>
                    <ul class="nested">
                      <li>Water</li>
                      <li>Coffee</li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
            <div className="projects-create">
              <h2>Create a new Project</h2>
              <ProjectsImageUploader />
            </div>
          </div>

          {/* <ImageUploader /> */}
        </section>
      </main>
    );
}

export default ManageProjects
