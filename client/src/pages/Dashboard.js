import React, { useEffect } from "react";
import { LOGOUT } from "../actions";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { AvatarPicker } from "../components";

const Dashboard = ({ isLogIn, logout }) => {
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  return (
    <section className="dashboard-page">
      <div className="dashboard">
        <h2>The super cescret dahsboard!!!</h2>
        <button onClick={handleLogout}>Log out</button>
        <AvatarPicker />
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({ isLogIn: state.isLogIn });

const mapDispatchToProps = (dispatch, ownProps) => {
  return { logout: () => dispatch({ type: LOGOUT }) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
