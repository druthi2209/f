import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext, useUser } from "../user/UserContext";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const[role, setRole] = useState();

  const { setIsLoggedin } = useUser(UserContext);

  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    console.log(username + " " + password);
    let newLogin = {
      username: username,
      password: password,
      role: role,
    };
    await axios
      .post("http://localhost:8080/login", newLogin)
      .then((response) => {
        let jwtToken = response.data.jwtToken;
        localStorage.setItem("jwtToken", jwtToken);
        let userName = response.data.username;
        localStorage.setItem("userName", userName);
        let role = response.data.role;
        localStorage.setItem("role", role);
        setIsLoggedin(true);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(newLogin);
  };

  return (
    <div className="row justify-content-center pt-5">
      <div className="col-sm-4">
        <div className="card p-2">
          <form>
            <div className="form-group mt-2">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                className="form-control"
                onChange={(e) => setUsername(e.target.value)}
                id="username"
              />
            </div>
            <div className="form-group mt-2">
              <label htmlFor="pwd">Password:</label>
              <input
                type="password"
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                id="pwd"
              />
            </div>

            <div className="form-group mt-2">
              <label htmlFor="role">Role</label>
              <select id="role" className="form-select" name="role" onChange={(e) => setRole(e.target.value)} value={role}>
                <option value={""}>Select...</option>
                <option>Admin</option>
                <option>User</option>
              </select>
            </div>

            <button
              type="submit"
              onClick={(e) => submitForm(e)}
              className="btn btn-default mt-4"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
