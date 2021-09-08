import e from 'cors'
import { set } from 'mongoose'
import React from 'react'
import { useState } from 'react'
import axios from "axios";



const SignInForm = () => {

    const [logIn, setLogIn] = useState({
      email: "admin@example.com",
      password: "example",
    });

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
        console.log(logIn)
        const response = await axios.post("http://localhost:5000/api/v1/auth/login",logIn);
        console.log(response);


    }

    return (
      <section className="login-section">
        <form className="login-form" onSubmit={handleSubmit}>
          <h1>Login</h1>
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
          <button type="submit">Log In</button>
        </form>
      </section>
    );
}

export default SignInForm
