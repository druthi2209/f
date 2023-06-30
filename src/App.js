import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "./components/layout/NavBar";
import Home from "./components/layout/Home";
import Footer from "./components/layout/Footer";
import Medicines from "./components/admin/Medicines";
import Users from "./components/admin/Users";
import Contact from "./components/layout/Contact";
import { Cart } from "./components/cart/Cart";
import Account from "./components/layout/Account";
import Login from "./components/layout/Login";
import AddMedicine from "./components/admin/AddMedicine";
import AddUser from "./components/user/AddUser";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ViewMedicines from "./components/medicine/ViewMedicines";
import Checkout from "./components/cart/Checkout";
import Orders from "./components/layout/Orders";
import { MedicineContextProvider } from "./components/cart/MedicineContext";
import UserContextProvider from "./components/user/UserContext";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <UserContextProvider>
      <MedicineContextProvider>
      <NavBar />
        <Routes>
          <Route path="/" exact Component={Home} />
          <Route path="/login" exact Component={Login} />
          <Route path="/medicines" exact Component={ViewMedicines} />
          <Route path="/contact" exact Component={Contact} />
          <Route path="/cart" exact Component={Cart} />
          <Route path="/addMedicine" exact Component={AddMedicine} />
          <Route path="/register" exact Component={AddUser} />
          <Route path="/viewUsers" exact Component={Users} />
          <Route path="/viewMedicines" exact Component={Medicines} />
          <Route path="/account" exact Component={Account} />
          <Route path="/checkout" exact Component={Checkout} />
          <Route path="/orders" exact Component={Orders} />
        </Routes>
      <Footer />
      </MedicineContextProvider>
      </UserContextProvider>
    </div>
  );
}

export default App;
