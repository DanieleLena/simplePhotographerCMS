import React from "react";
import { Link } from "react-router-dom";

const DescriptionLandingPage = () => {
  return (
    <article className="description-landing-page">
      <h2>Hi, I am Daniele</h2>
      <p>
        This website is a simple CMS for building portfolios for photographers. You
        can change the appearance of this website by logging in to the admin
        panel. It's also possible to add/remove images, create/delete projects,
        and modify the description or profile image on the contact page. <br />
        The project is still in progress and I am working on add new features,
        improve the UI and fix some bugs.
      </p>
      <div className="description-btn-container">
        <h3>Login to the admin panel:</h3>
        <Link to="/login">
          <button className="btn-FE">Login</button>
        </Link>
      </div>
    </article>
  );
};

export default DescriptionLandingPage;
