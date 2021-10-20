import React from "react";
import { LOGOUT } from "../actions";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Dashboard = ({ isLogIn, logout }) => {
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  return (
    <section className="dashboard-page">
      <div className="dashboard">
        <div className="dashboard-title dashboard-title-buttons ">
          <h3 className="logout" onClick={handleLogout}>
            Logout
          </h3>

          <div>
            <h1>Dashboard</h1>
            <h3>Welcome Admin</h3>
          </div>
          <Link to="/" target="_blank">
            <button className="custom-btn btn-2">View Live</button>
          </Link>
        </div>
        <div className="dashboard-carts-container">
          <div className="manage-card">
            <div className="manage-card-text">
              <h2>Manage Landing Page</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores porro debitis unde necessitatibus aperiam ipsa
              </p>

              <Link to="/admin/manageLandingPage">
                <button className="custom-btn btn-2">Manage</button>
              </Link>
            </div>
            <div className="manage-card-image">
              <img
                src="/assets/simplePhotographerCMS-thumbnail.jpg"
                alt="manage landing page"
              ></img>
            </div>
          </div>
          {/* Projects card  =======================================================*/}
          <div className="manage-card">
            <div className="manage-card-text">
              <h2>Manage Projects</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores porro debitis unde necessitatibus aperiam ipsa
              </p>
              <Link to="/admin/manageProjects">
                <button className="custom-btn btn-2">Manage</button>
              </Link>
            </div>
            <div className="manage-card-image">
              <img
                src="/assets/simplePhotographerCMS-projects.jpg"
                alt="manage projects"
              ></img>
            </div>
          </div>
          {/* layouts card  =======================================================*/}

          <div className="manage-card">
            <div className="manage-card-text">
              <h2>Manage Layouts</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores porro debitis unde necessitatibus aperiam ipsa
              </p>
              {/* <Link to="/admin/manageLayout"> */}
                <button className="custom-btn  coming-soon">Coming soon</button>
              {/* </Link> */}
            </div>
            <div className="manage-card-image">
              <img src="/assets/landignpage.jpg" alt="manage layout"></img>
            </div>
          </div>
          {/* Contacts card  =======================================================*/}

          <div className="manage-card">
            <div className="manage-card-text">
              <h2>Manage Contact</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Asperiores porro debitis unde necessitatibus aperiam ipsa
              </p>
              <Link to="/admin/manageContact">
                <button className="custom-btn btn-2">Manage</button>
              </Link>
            </div>
            <div className="manage-card-image">
              <img
                src="/assets/simplePhotographerCMS-contact.jpg"
                alt="manage contact page"
              ></img>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({ isLogIn: state.isLogIn });

const mapDispatchToProps = (dispatch, ownProps) => {
  return { logout: () => dispatch({ type: LOGOUT }) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
