import e from 'cors'
import { set } from 'mongoose'
import React from 'react'
import { useState,useEffect } from 'react'
import axios from "axios";
import '../axios';
import { connect } from 'react-redux';
import { LOGIN_SUCCESS } from "../actions";



const SignInForm = ({ loginSuccess}) => {
    const [logIn, setLogIn] = useState({
      email: "admin1@example.com",
      password: "example",
    });
    const [error, setError] = useState(false)

   

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
        // console.log(logIn)
        try {
          const {data} = await axios.post("/auth/login",logIn);
          // setError(false);
          localStorage.setItem(
            "user",
            JSON.stringify({ name: data.user.name, token: data.token })
            );
        
            loginSuccess(data);
          } catch (error) {
            console.log(error);
            setError(true);
        }
       


    }


    // useEffect(() => {
    //   localStorage.setItem(
    //     "user",
    //     JSON.stringify({ name: 'DANIELE', token:'PROVAATOKEN222' })
    //   );
    // }, [])
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
            onChange={formOnChange }
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
          <button type="submit">Log In</button>
        </form>
      </section>
    );
}

const mapDispatchToProps = (dispatch,ownProps) => {
  return { loginSuccess : (data) => dispatch({type: LOGIN_SUCCESS, payload: data})}
}

export default connect(null,mapDispatchToProps)(SignInForm);
