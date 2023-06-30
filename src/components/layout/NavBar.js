import React, { useEffect, useState } from "react";
import Logo from "./logo.png";
import { BsPersonCircle, BsCartPlus } from "react-icons/bs";
import { Row, Col, Navbar, Nav } from "react-bootstrap";
import "./NavBar.css";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  const [role, setRole] = useState("");
  useEffect(() => {
    setRole(localStorage.getItem("role"));
  },[role]);
  // let isLoggedIn = false;
  const admin = role === "Admin" ? true : false;
  console.log(admin);
    return (
    <div>
      <Row>
        <Col>
          <Navbar className="navbar navbar-dark bg-dark" expand="md">
            <Navbar.Brand href="/">
              <img src={Logo} height={50} width={50} style={{ marginLeft: "80px", marginRight: "400px" }} />
              E-Medicine Store
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="my-nav" />
            <Navbar.Collapse id="my-nav">
              <Nav className="ms-auto text-white">
                {admin && <Link to="/register" className="nav-link text-white">Register&nbsp;&nbsp;&nbsp;</Link>}
                {admin && <Link to="/viewUsers" className="nav-link text-white">View Users&nbsp;&nbsp;&nbsp;</Link>}
                {admin && <Link to="/viewMedicines" className="nav-link text-white">View Medicines&nbsp;&nbsp;&nbsp;</Link>}
                 {!admin && <Link to="/" className="nav-link text-white">Home&nbsp;&nbsp;&nbsp;</Link>}
                 {!admin &&  <Link to="/medicines" className="nav-link text-white">Medicines&nbsp;&nbsp;&nbsp;</Link>}
                  {!admin && <Link to="/contact" className="nav-link text-white">Contact&nbsp;&nbsp;&nbsp;</Link>}
                  {!admin && <Link to={ role === null ? "/login" : "/cart"} className="svgSize nav-link text-white">
                    <BsCartPlus />&nbsp;&nbsp;&nbsp;
                  </Link>}
                 {!admin && <Link to={ role === null ? "/login" : "/orders"} className="nav-link text-white">Orders&nbsp;&nbsp;&nbsp;</Link>}
                  {!admin && <Link to={ role === null ? "/login" : "/account"} className="svgSize nav-link text-white">
                    <BsPersonCircle />&nbsp;&nbsp;&nbsp;
                  </Link>}
                  <Link to="/login" className="nav-link text-white">Login&nbsp;&nbsp;&nbsp;</Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Col>
      </Row>
    </div>
  );
}
