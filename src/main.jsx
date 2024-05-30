import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import Store from "./redux/store.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Cart from "./pages/Card.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
