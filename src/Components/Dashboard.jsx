import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.get(`${backend_url}/auth/logout`).then((result) => {
      if (result.data.Status) {
        localStorage.removeItem("valid");
        navigate("/");
      }
    });
  };

  return (
    <div
      className="container-fluid"
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div className="row flex-nowrap">
        {/* Sidebar */}
        <div
          className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark"
          style={{ minHeight: "100vh" }}
        >
          <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-3 text-white">
            {/* Brand */}
            <Link
              to="/dashboard"
              className="d-flex align-items-center pb-3 mb-3 text-white text-decoration-none"
              style={{ fontWeight: "700", fontSize: "1.3rem" }}
            >
              <span className="d-none d-sm-inline">Mindery</span>
            </Link>

            {/* Menu */}
            <ul
              className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start w-100"
              id="menu"
            >
              {/* Dashboard */}
              <li className="w-100">
                <Link
                  to="/dashboard"
                  className="nav-link text-white px-2 py-2 d-flex align-items-center rounded hover-bg"
                >
                  <i className="bi bi-speedometer2 fs-5"></i>
                  <span className="ms-2 d-none d-sm-inline fw-medium">
                    Dashboard
                  </span>
                </Link>
              </li>

              {/* Manage Employees */}
              <li className="w-100">
                <Link
                  to="/dashboard/employee"
                  className="nav-link text-white px-2 py-2 d-flex align-items-center rounded hover-bg"
                >
                  <i className="bi bi-people fs-5"></i>
                  <span className="ms-2 d-none d-sm-inline fw-medium">
                    Manage Employees
                  </span>
                </Link>
              </li>

              {/* Category */}
              <li className="w-100">
                <Link
                  to="/dashboard/category"
                  className="nav-link text-white px-2 py-2 d-flex align-items-center rounded hover-bg"
                >
                  <i className="bi bi-columns fs-5"></i>
                  <span className="ms-2 d-none d-sm-inline fw-medium">
                    Category
                  </span>
                </Link>
              </li>

              {/* Profile */}
              <li className="w-100">
                <Link
                  to="/dashboard/profile"
                  className="nav-link text-white px-2 py-2 d-flex align-items-center rounded hover-bg"
                >
                  <i className="bi bi-person fs-5"></i>
                  <span className="ms-2 d-none d-sm-inline fw-medium">
                    Profile
                  </span>
                </Link>
              </li>

              {/* Assign Task */}
              <li className="w-100">
                <Link
                  to="/dashboard/tasks"
                  className="nav-link text-white px-2 py-2 d-flex align-items-center rounded hover-bg"
                >
                  <i className="bi bi-list-task fs-5"></i>
                  <span className="ms-2 d-none d-sm-inline fw-medium">
                    Assign Task
                  </span>
                </Link>
              </li>

              {/* Attendance (New) */}
              <li className="w-100">
                <Link
                  to="/dashboard/attendance"
                  className="nav-link text-white px-2 py-2 d-flex align-items-center rounded hover-bg"
                >
                  <i className="bi bi-calendar-check fs-5"></i>
                  <span className="ms-2 d-none d-sm-inline fw-medium">
                    Attendance
                  </span>
                </Link>
              </li>

              {/* Logout */}
              <li className="btn btn-danger logout-btn w-100 mt-3" onClick={handleLogout}>
                <Link className="nav-link text-white px-2 py-2 d-flex align-items-center rounded hover-bg">
                  <i className="bi bi-power fs-3"></i>
                  <span className="ms-2 d-none d-sm-inline fw-medium">
                    Logout
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Main Content */}
        <div className="col p-0 m-0">
          {/* Top Header */}
          <div
            className="p-3 shadow-sm d-flex justify-content-center align-items-center"
            style={{
              backgroundColor: "#f8f9fa",
              fontFamily: "'Roboto', sans-serif",
              fontWeight: "600",
              fontSize: "1.2rem",
            }}
          >
            Employee Management System
          </div>

          {/* Outlet */}
          <Outlet />
        </div>
      </div>

      <style>{`
        .hover-bg:hover {
          background-color: rgba(57, 54, 54, 0.1);
          transition: background 0.3s;
        }
        .fw-medium {
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
