import React from "react";
import { FaCheckCircle } from "react-icons/fa"; 

const Success = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", 
        alignItems: "center",     
        minHeight: "100vh",      
        textAlign: "center",
        padding: "2rem",
        backgroundColor: "#f9f9f9", 
      }}
    >
      <FaCheckCircle size={80} color="green" style={{ marginBottom: "1rem" }} />
      <h2 style={{ color: "#2e7d32", fontSize: "1.8rem", marginBottom: "0.5rem" }}>
        Password Changed Successfully!
      </h2>
      <p style={{ fontSize: "1.1rem", color: "#555" }}>
        You can now log in with your new password.
      </p>
    </div>
  );
};

export default Success;


