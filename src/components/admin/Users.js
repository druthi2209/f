import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const results = await axios.get("http://localhost:8080/getAllUsers");
    setUsers(results.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/deleteUserById/${id}`);
    loadUsers();
  };

  return (
    <div className="container">
      <div className="py-4">
        <div class="table-responsive-md">
          <table className="table border shadow table-striped table-hover table-responsive">
            <caption>List of users</caption>
            <thead className="thead-dark">
              <tr>
                <th scope="col">S. No.</th>
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Phone No.</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                <tr>
                  <th scope="row" key={index}>
                    {index + 1}
                  </th>
                  <td>{user.name}</td>
                  <td>{user.userName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.address}</td>
                  <td>
                    <Link
                      className="btn btn-primary mx-2"
                      to={`/viewuser/${user.id}`}
                    >
                      View
                    </Link>
                    <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/editUser/${user.id}`}
                      // add this same path in the router  when using this element like: /editUser/:id
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteUser(user.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
        <Link className="btn btn-primary mx-2" to="/addUser">
          Add User
        </Link>
      </div>
    </div>
  );
}
