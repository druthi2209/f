import React from "react";

import "./Contact.css";

import ContactImage from "./Contact.png";

function Contact() {
  const submit = () => {
    alert("Your message has been successfully sent!");
  };
  return (
    <div className="container">
      <div className="contact">
        <div
          className="leftSide"
          style={{ backgroundImage: `url(${ContactImage})` }}
        ></div>
        <div className="rightSide">
          <h1>Contact Us</h1>
          <form id="contact-form">
            <label htmlFor="name" />
            <input
              name="name"
              placeholder="&nbsp;Enter your name"
              type="text"
            />
            <label htmlFor="email" />
            <input
              name="email"
              placeholder="&nbsp;Enter your email"
              type="text"
            />
            <label htmlFor="message" />
            <textarea placeholder=" Enter your message" required />
            <button type="submit" onSubmit={submit}>
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
