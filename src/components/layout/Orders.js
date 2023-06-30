import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

export default function Orders() {
    let navigate = useNavigate();
    let [allCartItems, setAllCartItems] = useState();

    const handleClick = () => {
        navigate("/");
    };
    useEffect(()=>{
        loadCartItems();
    },[])
    const loadCartItems = async () => {
        const token = localStorage.getItem("jwtToken");
        const result = await axios.get(`http://localhost:8080/findAllCartItems`, {
            headers: {
                Authorization: "Bearer " + token,
            },
        });
        setAllCartItems(result.data);
    };

    return (
        <div className="p-3 mb-4">
            <center>
                <h3> Your Orders </h3>{" "}
            </center>
            <section className="h-100" style={{ backgroundColor: "#eee" }}>
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol md="10">
                            <div className="d-flex justify-content-between align-items-center mb-4"></div>
                            {allCartItems && allCartItems.map((cartItem) =>
                                <MDBCard className="rounded-3 mb-4">
                                    <MDBCardBody className="p-4">
                                        <MDBRow className="justify-content-between align-items-center">
                                            <MDBCol md="2" lg="2" xl="2">
                                                <MDBCardImage
                                                    className="rounded-3"
                                                    fluid
                                                    src={cartItem.medicine.url}
                                                    alt={cartItem.medicine.medicineName}
                                                />
                                            </MDBCol>
                                            <MDBCol md="3" lg="3" xl="3">
                                                <MDBTypography tag="h5" className="mb-0">
                                                    {cartItem.medicine.medicineName}
                                                </MDBTypography>
                                            </MDBCol>
                                            <MDBCol
                                                md="3"
                                                lg="3"
                                                xl="2"
                                                className="d-flex align-items-center justify-content-around"
                                            >
                                                <MDBTypography tag="h5" className="mb-0">
                                                    {cartItem.quantity}
                                                </MDBTypography>
                                            </MDBCol>
                                            
                                        </MDBRow>
                                    </MDBCardBody>
                                </MDBCard>
                            )}
                            <MDBCard>
                                                <MDBCardBody>
                                                    <center>
                                                        <MDBBtn
                                                            onClick={handleClick}
                                                            className="ms-3 align-items-center"
                                                            block
                                                            size="lg"
                                                        >
                                                            Okay
                                                        </MDBBtn>
                                                    </center>
                                                </MDBCardBody>
                                            </MDBCard>
            </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </div>
    );
}
