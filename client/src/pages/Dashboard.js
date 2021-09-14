import React, { useEffect } from "react";
import { LOGOUT } from "../actions";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { ImageUploader, ManageCard } from "../components";
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
        <div className="dashboard-title">
          <h1>Dashboard</h1>
          <h3>Welcome Admin</h3>
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
              <img src="/assets/landignpage.jpg"></img>
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
              <img src="/assets/projects-card.jpg"></img>
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
              <Link to="/admin/manageLayout">
                <button className="custom-btn btn-2">Manage</button>
              </Link>
            </div>
            <div className="manage-card-image">
              <img src="/assets/landignpage.jpg"></img>
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
              <img src="/assets/landignpage.jpg"></img>
            </div>
          </div>
        </div>
        <button onClick={handleLogout}>Log out</button>
        {/* <ImageUploader /> */}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({ isLogIn: state.isLogIn });

const mapDispatchToProps = (dispatch, ownProps) => {
  return { logout: () => dispatch({ type: LOGOUT }) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
