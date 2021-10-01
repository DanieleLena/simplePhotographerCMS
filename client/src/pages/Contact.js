import React, { useState, useEffect } from "react";
import { Navbar, Footer } from "../components";
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
      } = await axios.get(`${url}/upload/contact`);
      setContact(contact[0]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
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
        <h2>Loading...</h2>
      ) : (
        <>
          <section className="about-section">
            <div className="about-description">
              <div className="about-image">
                <img src={contact.imgUrl} width="400px" alt={contact.name} />
              </div>
              <article className="about-text">
                <h1>Hi, I am {contact.name}</h1>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Recusandae amet repellat doloribus veniam expedita harum
                  consequuntur, aliquam nulla dolores perspiciatis odit rem
                  omnis cum dicta quis adipisci sequi animi doloremque officiis
                  ipsam laboriosam et rerum! Recusandae asperiores repudiandae
                  odio iure! Lorem ipsum dolor sit amet consectetur adipisicing
                  elit. Recusandae amet repellat doloribus veniam expedita harum
                  consequuntur, aliquam nulla
                </p>
              </article>
            </div>
          </section>

          <section className="form-section">
            <h1>Contact</h1>
            <form
              className="contact-form"
              action="#"
              method="POST"
            >
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
