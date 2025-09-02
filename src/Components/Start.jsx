import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserTie, FaUser } from "react-icons/fa";
import "./Start.css";  // Import the CSS file

const Start = () => {
  const navigate = useNavigate();

  return (
    <div className="start-container">
      {/* Title */}
      <h1 className="title">Employee Management System</h1>
      <p className="subtitle">Choose your login/Signup type to access the system</p>

      {/* Cards */}
      <div className="cards-container">
        {/* Admin Login */}
        <div className="card">
          <div className="icon admin-icon">
            <FaUserTie size={40} />
          </div>
          <h2 className="card-title">Admin Login</h2>
          <p className="card-text">
            Access admin panel to manage employees, tasks, and categories
          </p>
          <button
            className="btn admin-btn"
            onClick={() => navigate("/adminlogin")}
          >
            Login as Admin
          </button>

        <button
          className="btn admin-btn"
          onClick={() => alert("Signup button clicked")}
          style={{ marginTop: "10px", border: "2px solid red", padding: "10px", backgroundColor: "yellow" }} >
          Signup as Admin
        </button>
      
        </div>

        {/* Employee Login */}
        <div className="card">
          <div className="icon employee-icon">
            <FaUser size={40} />
          </div>
          <h2 className="card-title">Employee Login</h2>
          <p className="card-text">
            Access your dashboard to view tasks and profile information
          </p>
          <button
            className="btn employee-btn"
            onClick={() => navigate("/employee_login")}
          >
            Login as Employee
          </button>

        </div>
        
      </div>

      {/* Footer */}
      <div className="footer">Made by MGX</div>
    </div>
  );
};

export default Start;
