import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
    address: "",
  });

  const { name, email, username, password, phoneNumber, address } = user;

  const onInputChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    loadUser();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    await axios.put(`http://localhost:8080/updateUserById/${id}`, user);
    navigate("/");
  };

  //for showing present data into Edit User form
  const loadUser = async () => {
    const result = await axios.get(`http://localhost:8080/getUserById/${id}`);
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded-sm p-4 mt-2 shadow">
          <h2 className="text-center m-4"> Edit User </h2>
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
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username..."
                name="username"
                value={username}
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
