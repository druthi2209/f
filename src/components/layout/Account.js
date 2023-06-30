import React, { useState, useEffect} from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBTypography,
  MDBCardImage,
  MDBIcon,
} from "mdb-react-ui-kit";
import User from "../layout/user.png";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function Account() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    userName: "",
    phoneNumber: "",
    address: "",
  });


  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const token = localStorage.getItem("jwtToken");
    const userName = localStorage.getItem("userName")
    const result = await axios.get(`http://localhost:8080/findByUserName`, {
      params: {
        userName: userName
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    setUser(result.data);
    localStorage.setItem("userId", result.data.userId)
    console.log(result)
  };


  return (
    <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="6" className="mb-4 mb-lg-0">
            <MDBCard className="mb-5">
              <MDBRow className="g-0">
                <MDBCol
                  md="4"
                  className="gradient-custom text-center text-white"
                >
                  <MDBCardImage
                    src={User}
                    alt="Avatar"
                    className="my-3"
                    style={{ width: "40px" }}
                    fluid
                  /> 
                  <MDBTypography tag="h5">{user.name}</MDBTypography>
                  <MDBCardText>User</MDBCardText>
                  <MDBIcon far icon="edit mb-5" />
                </MDBCol>
                <MDBCol md="8">
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h6">Information: {user.name} </MDBTypography>
                    <hr className="mt-0 mb-4" />
                    <MDBRow className="pt-1">
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Username</MDBTypography>
                        <MDBCardText className="text-muted">
                        {user.userName}
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Email</MDBTypography>
                        <MDBCardText className="text-muted">
                        {user.email}
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Phone Number</MDBTypography>
                        <MDBCardText className="text-muted">
                        {user.phoneNumber}
                        </MDBCardText>
                      </MDBCol>
                      <MDBCol size="6" className="mb-3">
                        <MDBTypography tag="h6">Address</MDBTypography>
                        <MDBCardText className="text-muted">
                        {user.address}
                        </MDBCardText>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCol>
              </MDBRow>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
