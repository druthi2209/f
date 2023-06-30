import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MedicineContext } from "../cart/MedicineContext.js";
import { Link, useParams } from "react-router-dom";

export default function Medicines() {
  let navigate = useNavigate();
  // const { isLoggedIn } = useUser(UserContext);
  // const [medicinesData, setMedicinesData] = useState([]);
  const { addToCart, medicinesData, setMedicinesData, loadMedicines } =
    useContext(MedicineContext);

    // const {isLoggedin} = useContext(UserContext);

  useEffect(() => {
    loadMedicines();
  }, []);
  // const [result, setResult] = useState([]);
  const [role, setRole] = useState();
  useEffect(() => {
    setRole(localStorage.getItem("Role"));
  },[role]);
  // let isLoggedIn = false;
  const admin = role === "Admin" ? true : false;

  //Fetching medicines
  useEffect(() => {
    const loadMedicines = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const results = await axios.get(
          "http://localhost:8080/getAllMedicines",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        setMedicinesData(results.data);
      } catch (e) {
        console.log(e);
      }
    };
    loadMedicines();
  }, []);

  const deleteMedicine = async (id) => {
    await axios.delete(`http://localhost:8080/deleteMedicineById/${id}`);
    // loadMedicines();
  };

  return (
    <div className="container">
      <div className="py-4">
        <div className="table-responsive-md">
          <table className="table border shadow table-striped table-hover table-responsive">
            <caption>List of medicines</caption>
            <thead className="thead-dark">
              <tr>
                <th scope="col">S. No.</th>
                <th scope="col">Medicine Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
                <th scope="col">Manufactured Date</th>
                <th scope="col">Expiry Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {medicinesData.map((medicine, index) => {
                <tr>
                  <th scope="row" key={index}>
                    {index + 1}
                  </th>
                  <td>{medicine.medicineName}</td>
                  <td>{medicine.quantity}</td>
                  <td>{medicine.price}</td>
                  <td>{medicine.manufacturingDate}</td>
                  <td>{medicine.expiryDate}</td>
                  <td>
                    <Link
                      className="btn btn-outline-primary mx-2"
                      to={`/editmedicine/${medicine.id}`}
                      // add this same path in the router  when using this element like: /editmedicine/:id
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => deleteMedicine(medicine.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
        <Link className="btn btn-primary mx-2" to="/addMedicine">
          Add Medicine
        </Link>
      </div>
    </div>
  );
}
