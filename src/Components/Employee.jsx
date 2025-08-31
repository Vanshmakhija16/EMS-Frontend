import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Employee = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios
      .get(`${backend_url}/auth/employee`)
      .then((result) => {
        if (result.data.Status) {
          setEmployees(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${backend_url}/auth/delete_employee/${id}`)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div
      className="container mt-5"
      style={{
        fontFamily: "'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {/* Google Font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3
          style={{
            color: "#0d6efd",
            fontWeight: "700",
            fontSize: "1.8rem",
            textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          👨‍💼 Employee List
        </h3>
        <Link
          to="/dashboard/add_employee"
          className="btn btn-success btn-sm d-flex align-items-center shadow-sm"
          style={{
            fontWeight: "500",
            letterSpacing: "0.5px",
            borderRadius: "8px",
          }}
        >
          <i className="bi bi-plus-circle me-1 fs-5"></i> Add Employee
        </Link>
      </div>

      {/* Card */}
      <div
        className="card shadow-lg rounded"
        style={{
          borderRadius: "15px",
          overflow: "hidden",
          border: "none",
        }}
      >
        <div className="card-body p-0">
          <table
            className="table table-striped table-hover mb-0 align-middle"
            style={{ borderCollapse: "separate", borderSpacing: "0 0.5rem" }}
          >
            <thead
              className="table-dark"
              style={{
                borderRadius: "15px",
                fontSize: "0.95rem",
                letterSpacing: "0.5px",
              }}
            >
              <tr>
                <th>Sno.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Salary</th>
                <th>Check-In</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e, index) => (
                <tr
                  key={e.Id}
                  style={{
                    backgroundColor: "#fdfdfe",
                    boxShadow: "0px 2px 5px rgba(0,0,0,0.05)",
                    borderRadius: "10px",
                  }}
                >
                  <td>{index + 1}</td>
                  <td style={{ fontWeight: "600", color: "#212529" }}>{e.name}</td>
                  <td className="text-muted">{e.email}</td>
                  <td className="text-muted">{e.address}</td>
                  <td style={{ fontWeight: "600", color: "#0d6efd" }}>${e.salary}</td>
                  <td>
                    {e.checkedIn ? (
                      <span
                        className="badge"
                        style={{
                          backgroundColor: "#198754",
                          color: "#fff",
                          fontSize: "0.8rem",
                          padding: "0.35em 0.5em",
                        }}
                      >
                        Checked In
                        <br />
                        <small className="fw-normal">
                          {e.checkInTime
                            ? new Date(e.checkInTime).toLocaleTimeString()
                            : "-"}
                        </small>
                      </span>
                    ) : (
                      <span
                        className="badge"
                        style={{
                          backgroundColor: "#dc3545",
                          color: "#fff",
                          fontSize: "0.8rem",
                          padding: "0.35em 0.5em",
                        }}
                      >
                        Not Checked In
                      </span>
                    )}
                  </td>
                  <td className="text-center">
                    <Link
                      to={`/dashboard/edit_employee/${e.Id}`}
                      className="btn btn-info btn-sm p-1 me-1 shadow-sm"
                      title="Edit"
                      style={{
                        borderRadius: "6px",
                        background: "linear-gradient(90deg, #0dcaf0, #0d6efd)",
                        border: "none",
                        color: "#fff",
                      }}
                    >
                      <i className="bi bi-pen fs-6"></i>
                    </Link>
                    <button
                      className="btn btn-danger btn-sm p-1 shadow-sm"
                      onClick={() => handleDelete(e.Id)}
                      title="Delete"
                      style={{
                        borderRadius: "6px",
                        background: "linear-gradient(90deg, #f03e3e, #dc3545)",
                        border: "none",
                        color: "#fff",
                      }}
                    >
                      <i className="bi bi-trash fs-6"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-3 text-muted">
                    No employees found 😢
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Employee;
