import React, { useEffect, useState } from 'react';
import axios from 'axios';

const backend_url = "http://localhost:3000"; // Replace with your backend URL

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0);
  const [employeeTotal, setEmployeeTotal] = useState(0);
  const [salaryTotal, setSalaryTotal] = useState(0);
  const [admins, setAdmins] = useState([]);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchAdminCount();
    fetchEmployeeCount();
    fetchSalaryCount();
    fetchAdminRecords();
    fetchEmployees();
  }, []);

  // Fetch total admins
  const fetchAdminCount = () => {
    axios.get(`${backend_url}/auth/admin_count`)
      .then(result => {
        if (result.data.Status) {
          setAdminTotal(result.data.Result[0].admin);
        }
      })
      .catch(err => console.error("Admin count error:", err));
  };

  // Fetch total employees
  const fetchEmployeeCount = () => {
    axios.get(`${backend_url}/auth/employee_count`)
      .then(result => {
        if (result.data.Status) {
          setEmployeeTotal(result.data.Result[0].employee);
        }
      })
      .catch(err => console.error("Employee count error:", err));
  };

  // Fetch total salary
  const fetchSalaryCount = () => {
    axios.get(`${backend_url}/auth/salary_count`)
      .then(result => {
        if (result.data.Status) {
          setSalaryTotal(result.data.Result[0].salaryOFEmp);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.error("Salary count error:", err));
  };

  // Fetch admin records
  const fetchAdminRecords = () => {
    axios.get(`${backend_url}/auth/admin_records`)
      .then(result => {
        if (result.data.Status) {
          setAdmins(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.error("Admin records error:", err));
  };

  // Fetch employee records
  const fetchEmployees = () => {
    axios.get(`${backend_url}/auth/employee`)
      .then(result => {
        if (result.data.Status) {
          setEmployees(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch(err => console.error("Employees fetch error:", err));
  };

  return (
    <div className="container mt-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Google Font: Consider adding this to index.html for performance */}
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Stats Cards */}
      <div className="d-flex justify-content-around flex-wrap mb-5">
        {[
          { title: "Admins", total: adminTotal, bg: "info" },
          { title: "Employees", total: employeeTotal, bg: "success" },
          { title: "Salary", total: `$${salaryTotal}`, bg: "warning" },
        ].map((stat, index) => (
          <div
            key={index}
            className={`card text-white bg-${stat.bg} mb-3 shadow-sm`}
            style={{ width: '18rem', borderRadius: '15px' }}
          >
            <div className="card-body text-center">
              <h5 className="card-title" style={{ fontWeight: '600' }}>{stat.title}</h5>
              <p className="card-text" style={{ fontSize: '1.5rem', fontWeight: '700' }}>
                {stat.total}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Admins Table */}
      <div className="mb-5">
        <h3 className="mb-3 text-primary" style={{ fontWeight: '600' }}>Admins</h3>
        <div className="card shadow-sm rounded">
          <div className="card-body p-0">
            <table className="table table-striped table-hover mb-0 align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Email</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins.length > 0 ? admins.map(a => (
                  <tr key={a.id}>
                    <td>{a.email}</td>
                    <td className="text-center">
                      <button className="btn btn-info btn-sm me-2 shadow-sm">Edit</button>
                      <button className="btn btn-danger btn-sm shadow-sm">Delete</button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="2" className="text-center text-muted py-3">
                      No admins found 😢
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Employees Table */}
      <div className="mb-5">
        <h3 className="mb-3 text-primary" style={{ fontWeight: '600' }}>Employees</h3>
        <div className="card shadow-sm rounded">
          <div className="card-body p-0">
            <table className="table table-striped table-hover mb-0 align-middle">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Check-in Status</th>
                  <th>Check-in Time</th>
                </tr>
              </thead>
              <tbody>
                {employees.length > 0 ? employees.map(emp => (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>
                      {typeof emp.checkedIn === "boolean"
                        ? (emp.checkedIn
                            ? <span className="badge bg-success">Checked In</span>
                            : <span className="badge bg-danger">Not Checked In</span>)
                        : <span className="badge bg-secondary">Unknown</span>
                      }
                    </td>
                    <td>
                      {emp.checkInTime && !isNaN(new Date(emp.checkInTime).getTime())
                        ? new Date(emp.checkInTime).toLocaleString()
                        : '—'}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="text-center text-muted py-3">
                      No employees found 😢
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
