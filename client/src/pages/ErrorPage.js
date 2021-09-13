import React from 'react'
import {Link} from "react-router-dom";

const ErrorPage = () => {
    return (
      <>
        <section className="errorPage">
          <img
            src='/assets/404.png'
            alt="page not found"
          />
          <Link to="/">
            <button>Back Home</button>
          </Link>
          <p>
            <a href="https://pngtree.com/so/web-page">
              web page png from pngtree.com
            </a>
          </p>
        </section>
      </>
    );
}


export default ErrorPage
