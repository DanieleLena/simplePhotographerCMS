import React, { useState, useEffect } from "react";
import { Navbar, Footer,Loading } from "../components";
import axios from "axios";
import { url } from "../helpers";

const Contact = () => {
  const [contact, setContact] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchContact = async () => {
    try {
      setIsLoading(true);
      const {
        data: { contact },
      } = await axios.get(`${url}/get/contact`);
      setContact(contact[0]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContact();
  }, []);
  useEffect(() => {
    console.log(contact);
  }, [contact]);
  return (
    <>
      <Navbar />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <section className="about-section" data-testid="contactTest">
            {contact && (
              <div className="about-description">
                <div className="about-image">
                  <img src={contact.imgUrl} width="400px" alt={contact.name} />
                </div>
                <article className="about-text">
                  <h1>Hi, I am {contact.name}</h1>
                  <p>{contact.description}</p>
                </article>
              </div>
            )}
          </section>

          <section className="form-section">
            <h1>Contact</h1>
            <form className="contact-form" action="#" method="POST">
              <label htmlFor="name">Name:</label>
              <input name="name" type="text" required />
              <label htmlFor="email">Email:</label>
              <input name=" _replyto" type="email" required />
              <label htmlFor="messagge">Message:</label>
              <textarea
                name="messagge"
                id="messagge"
                cols="30"
                rows="10"
                required
              ></textarea>
              <button className="btn" type="submit">
                Send
              </button>
            </form>
          </section>
        </>
      )}
      <Footer />
    </>
  );
};

export default Contact;
