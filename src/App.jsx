import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangePassword from "./pages/changePassword/ChangePassword";
import Success from "./pages/success/success";

import "./App.css";
function App() {
  return (
    <>
      <Routes>
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<Navigate to="/change-password" />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
