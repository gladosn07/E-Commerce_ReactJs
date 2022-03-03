import React, { useContext } from "react";
import { Products, Navbar, Cart, Chekout } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthContext } from "./provider/authContext";

function App() {
  const { cart } = useContext(AuthContext);

  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Routes>
          <Route exact path="/" element={<Products />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout" element={<Chekout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
