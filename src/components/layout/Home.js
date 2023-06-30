import React from "react";
import HomePageImage from "./Home.png";
import AboutImage from "./About.png";
import { Link } from "react-router-dom";
import "./Home.css";
import "./About.css";

export default function Home() {
  // const user = localStorage.getitem("Name")
  // const userD = user === "Admin"
  return (
    <div className="container">
      <div className="row align-items-center">
          <div className='home'
            style={{
              backgroundImage: `url(${HomePageImage})`
            }}
          >
            <div className='headerContainer'>
              <center><h1> E - MEDICINE STORE </h1></center>
              <center><p>Empowering you with Virtual Care</p></center>
              <center><Link to="/medicines">
                <button> ORDER NOW </button>
              </Link>
              </center>
            </div>
          </div>
          <div className='about'>
            <div className='aboutTop'>
              <h1> ABOUT US</h1>
              <div id="abt">
                <img className='aboutBottom' src={AboutImage} />
                <div className='aboutBottom'>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam scelerisque mi ante, sed laoreet orci semper ac. Maecenas eu dolor nec ligula rhoncus varius vitae id turpis. Mauris rutrum scelerisque nunc, sit amet fringilla ante. Maecenas mauris est, feugiat sed elementum in, mollis ut turpis. Sed dignissim, erat at pretium ultrices, nisi arcu pellentesque nulla, id efficitur augue mauris dapibus urna. Morbi non tincidunt dui. Pellentesque a auctor odio.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
