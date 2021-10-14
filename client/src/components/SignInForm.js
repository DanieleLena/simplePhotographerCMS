import React from 'react'
import { useState } from 'react'
import axios from "axios";
import '../axios';
import { connect } from 'react-redux';
import { LOGIN_SUCCESS } from "../actions";
import { useHistory } from "react-router-dom";





const SignInForm = ({ loginSuccess}) => {
    const [logIn, setLogIn] = useState({
      email: "admin1@example.com",
      password: "example",
    });
    const [error, setError] = useState(false)

    const history = useHistory();


    const formOnChange = (e) => {
        if(e.target.name === "email") {
            setLogIn({
                ...logIn,
                email: e.target.value,
            })
        }
          if(e.target.name === "password") {
            setLogIn({
                ...logIn,
                password: e.target.value,
            })
        }
    }
    const handleSubmit =  async (e) => {
        e.preventDefault();

        try {
          const {data} = await axios.post("/auth/login",logIn);
          localStorage.setItem(
            "user",
            JSON.stringify({ name: data.user.name, token: data.token })
            );
            loginSuccess(data);
            history.push("/admin");

          } catch (error) {
            console.log(error);
            setError(true);
        }
       
    }



    return (
      <section className="login-section">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
          <p>Please keep the default values to login</p>
          <label htmlFor="email">email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={logIn.email}
            onChange={formOnChange}
            required
          ></input>
          <label htmlFor="password">password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={logIn.password}
            onChange={formOnChange}
            required
          ></input>
          {error && <h2>Password or email incorretc</h2>}
          <button className="custom-btn btn-2" type="submit">
            <span>Log In</span>
          </button>
        </form>
      </section>
    );
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return { loginSuccess : (data) => dispatch({type: LOGIN_SUCCESS, payload: data})}
}

export default connect(null,mapDispatchToProps)(SignInForm);
