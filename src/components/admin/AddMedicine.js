import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import DatePicker from "./DatePick.js";

const AddMedicine = ({ setAdd, add }) => {
  const [medicineName, setMedicineName] = useState("");
  const [url, setUrl] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [manufacturedDate, setManufacturedDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [price, setPrice] = useState(0.0);
  const input = useRef(null);
  const token = localStorage.getItem("jwtToken");

  let navigate = useNavigate();

  useEffect(() => {
    input.current.focus();
  }, [add]);

  const handleAdd = async (event) => {
    event.preventDefault();

    let newMedicine = {
      medicineName: medicineName,
      url: url,
      quantity: quantity,
      manufacturingDate: manufacturedDate,
      expiryDate: expiryDate,
      price: price,
    };
    console.log("Med", newMedicine);
    console.log("Manufacture", manufacturedDate);

    try {
      const token = localStorage.getItem("jwtToken");
      const response = await axios.post(
        "http://localhost:8080/addMedicine",
        newMedicine,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response);
      navigate("/medicines");
    } catch (error) {
      console.log("An error occurred while adding the Medicine:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <form>
            <h2 className="text-center m-4"> Add Medicine </h2>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Medicine Name:
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter the medicine name..."
                name="medicineName"
                ref={input}
                required
                onChange={(e) => setMedicineName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Quantity" className="form-label">
                Medicine quantity:
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter the medicine quantity..."
                name="quantity"
                required
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Price" className="form-label">
                Medicine price:
              </label>
              <input
                type={"number"}
                className="form-control"
                placeholder="Enter the medicine price..."
                name="price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="Url" className="form-label">
                Medicine Image Url:
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter the medicine image url..."
                name="url"
                required
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ManufacturedDate" className="form-label">
                Medicine Manufactured Date:
              </label>
              <input
                type="date"
                onChange={(e) => setManufacturedDate(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ExpiryDate" className="form-label">
                Medicine Expiry Date:
              </label>
              <input
                type="date"
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </div>
            <div className="center">
              <button
                className="btn btn-success"
                type="submit"
                onClick={handleAdd}
              >
                Add
              </button>
              <button
                className="btn btn-danger"
                type="cancel"
                onClick={() => setAdd()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMedicine;
