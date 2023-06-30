import { useEffect, useState } from "react";
import axios from "axios";
import Searchbar from "./Searchbar.js";
// import { useCart, CartContext } from "../cart/CartContext";
import { useUser, UserContext } from "../user/UserContext";
import "./ViewMedicines.css";
import { useNavigate } from "react-router-dom";
import { MedicineContext } from "../cart/MedicineContext.js";
import { useContext } from "react";

function ViewMedicines() {
  let navigate = useNavigate();
  // const { isLoggedIn } = useUser(UserContext);
  // const [medicinesData, setMedicinesData] = useState([]);
  const { addToCart, medicinesData, setMedicinesData, loadMedicines } =
    useContext(MedicineContext);

    const {isLoggedin} = useContext(UserContext);

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

  const handleSearch = (searchTerm) => {
    // Filter the medicines based on the search term
    const filteredMedicines = medicinesData.filter((medicine) =>
      medicine.medicineName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setMedicinesData(filteredMedicines);
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>List of Medicines</h1>
      <div className="search-bar-container">
        <Searchbar onSearch={handleSearch} />
      </div>
      <div className="row" id="medicines">
        {medicinesData.map((medicine) => (
          <div
            key={medicine.medicineId}
            className="col-md-3"
            style={{ marginTop: "1rem" }}
          >
            <div className="col-sm-6">
              <div
                className="card bg-light border-secondary mb-3 text-center"
                id="medicine"
                style={{ marginLeft: "-3rem", width: "15 rem" }}
              >
                <center>
                  <img
                    className="card-img-top"
                    src={medicine.url}
                    alt={medicine.medicineName}
                    style={{ marginTop: "1rem", width: "80px", height: "80px" }}
                  />
                </center>
                <div className="card-body text-secondary">
                  <h5 className="card-title" id="medicineTitle">
                    Name: {medicine.medicineName}{" "}
                  </h5>
                  <p className="card-text">Quantity: {medicine.quantity} </p>
                  <p className="card-text">Price: ₹{medicine.price} </p>
                  <p className="card-text">
                    Manufactured Date: {medicine.manufacturingDate}{" "}
                  </p>
                  <p className="card-text">
                    Expiry Date: {medicine.expiryDate}{" "}
                  </p>
                  {!admin && isLoggedin && <button
                    className="addToCartButton"
                    onClick={() => addToCart(medicine.medicineId)}
                  >
                    Add To Cart
                  </button>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewMedicines;
