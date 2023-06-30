import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function AddUser() {
  let navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    userName: "",
    password: "",
    phoneNumber: "",
    address: "",
    role: "ROLE_USER",
  });


  const { name, email, userName, password, phoneNumber, address } = user;

  const onInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log("user", user);
    await axios.post("http://localhost:8080/addUser", user);
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded-sm p-4 mt-2 shadow">
          <h2 className="text-center m-4"> Register User </h2>
          <form onSubmit={(event) => submitHandler(event)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your name..."
                name="name"
                value={name}
                onChange={(event) => onInputChange(event)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Email" className="form-label">
                Email
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your email..."
                name="email"
                value={email}
                onChange={(event) => onInputChange(event)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="userName" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username..."
                name="userName"
                value={userName}
                onChange={(event) => onInputChange(event)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Set your password..."
                name="password"
                value={password}
                onChange={(event) => onInputChange(event)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="PhoneNumber" className="form-label">
                Phone Number
              </label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter your phone number..."
                name="phoneNumber"
                value={phoneNumber}
                onChange={(event) => onInputChange(event)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your address..."
                name="address"
                value={address}
                onChange={(event) => onInputChange(event)}
              />
            </div>
            <center>
              <button type="submit" className="btn btn-outline-primary mx-2">
                Submit
              </button>
              <Link className="btn btn-outline-danger mx-2" to="/">
                Cancel
              </Link>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
}
