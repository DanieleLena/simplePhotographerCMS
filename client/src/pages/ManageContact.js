import React,{useEffect,useState} from "react";
import { ImageUploader } from "../components";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BiEditAlt } from "react-icons/bi";
import {url} from '../helpers';
import axios from "axios"

const ManageContact = () => {

  const [contact,setContact] = useState({});
  const [isLoading,setIsLoading] = useState(false);

  const fetchContact = async () => {

    setIsLoading(true);
    try {
      const {data} = await axios.get(`${url}/upload/contact`);
      const {contact} = data;
      setContact(contact[0]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchContact();
  }, [])


  const handleOnChange = (e) => {
    const value = e.target.value;
    setContact({
      ...contact,
      [e.target.name]: value,
    });
  };

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

        {/* <ImageUploader /> */}
      </section>
    </main>
  );
};

export default ManageContact;
