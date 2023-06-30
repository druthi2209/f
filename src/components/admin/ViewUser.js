import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewUser() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    username: "",
    phoneNumber: "",
    address: "",
  });

  const { id } = useParams();

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const token = localStorage.getItem("jwtToken");
    const result = await axios.get(`http://localhost:8080/getUserById/${id}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setUser(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded-sm p-4 mt-2 shadow">
          <h2 className="text-center m-4"> User Details </h2>
          <div className="card">
            <div className="card-header">
              Details of user id: {user.id}
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Name: </b>
                  {user.name}
                </li>
                <li className="list-group-item">
                  <b>Email: </b>
                  {user.email}
                </li>
                <li className="list-group-item">
                  <b>Username: </b>
                  {user.username}
                </li>
                <li className="list-group-item">
                  <b>PhoneNumber: </b>
                  {user.phoneNumber}
                </li>
                <li className="list-group-item">
                  <b>Address: </b>
                  {user.address}
                </li>
              </ul>
            </div>
          </div>
          <center>
            <Link className="btn btn-primary my-2" to={"/"}>
              Home
            </Link>
          </center>
        </div>
      </div>
    </div>
  );
}
