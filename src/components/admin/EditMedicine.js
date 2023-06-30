import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DatePicker from "./DatePick";

export default function EditMedicine() {
  let navigate = useNavigate();

  const { id } = useParams();

  const [medicine, setMedicine] = useState({
    name: "",
    quantity: "",
    price: "",
    manufacturedDate: "",
    expiryDate: "",
  });

  const { name, quantity, price, manufacturedDate, expiryDate } = medicine;

  const onInputChange = (event) => {
    setMedicine({ ...medicine, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    loadMedicine();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    await axios.put(`http://localhost:8080/updateMedicineById/${id}`, medicine);
    navigate("/");
  };

  //for showing present data into Edit Medicine form
  const loadMedicine = async () => {
    const result = await axios.get(
      `http://localhost:8080/getMedicineById/${id}`
    );
    setMedicine(result.data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded-sm p-4 mt-2 shadow">
          <h2 className="text-center m-4"> Edit Medicine </h2>
          <form onSubmit={(event) => submitHandler(event)}>
            <div className="mb-3">
              <label htmlFor="Name" className="form-label">
                Medicine Name:
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter the medicine name..."
                name="name"
                value={name}
                onChange={(event) => onInputChange(event)}
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
                value={quantity}
                onChange={(event) => onInputChange(event)}
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
                value={price}
                onChange={(event) => onInputChange(event)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ManufacturedDate" className="form-label">
                Medicine Manufactured Date:
              </label>
              <DatePicker />
            </div>
            <div className="mb-3">
              <label htmlFor="ExpiryDate" className="form-label">
                Medicine Expiry Date:
              </label>
              <DatePicker />
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
