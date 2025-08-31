import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Home = () => {
  const [adminTotal, setAdminTotal] = useState(0)
  const [employeeTotal, setemployeeTotal] = useState(0)
  const [salaryTotal, setSalaryTotal] = useState(0)
  const [admins, setAdmins] = useState([])
  const [employees, setEmployees] = useState([])

  useEffect(() => {
    adminCount();
    employeeCount();
    salaryCount();
    AdminRecords();
    fetchEmployees();
  }, [])

  const AdminRecords = () => {
    axios.get(`${backend_url}/auth/admin_records`)
      .then(result => {
        if(result.data.Status) {
          setAdmins(result.data.Result)
        } else {
          alert(result.data.Error)
        }
      })
  }

  const adminCount = () => {
    axios.get(`${backend_url}/auth/admin_count`)
      .then(result => {
        if(result.data.Status) {
          setAdminTotal(result.data.Result[0].admin)
        }
      })
  }

  const employeeCount = () => {
    axios.get(`${backend_url}/auth/employee_count`)
      .then(result => {
        if(result.data.Status) {
          setemployeeTotal(result.data.Result[0].employee)
        }
      })
  }

  const salaryCount = () => {
    axios.get(`${backend_url}`/auth/salary_count)
      .then(result => {
        if(result.data.Status) {
          setSalaryTotal(result.data.Result[0].salaryOFEmp)
        } else {
          alert(result.data.Error)
        }
      })
  }

  const fetchEmployees = () => {
    axios.get(`${backend_url}/auth/employee`)
      .then(result => {
        if (result.data.Status) {
          setEmployees(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div className="container mt-5" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Google Font */}
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />

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
              <p className="card-text" style={{ fontSize: '1.5rem', fontWeight: '700' }}>{stat.total}</p>
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
                {admins.map(a => (
                  <tr key={a.id}>
                    <td>{a.email}</td>
                    <td className="text-center">
                      <button className="btn btn-info btn-sm me-2 shadow-sm">
                        Edit
                      </button>
                      <button className="btn btn-danger btn-sm shadow-sm">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
                {admins.length === 0 && (
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
                {employees.map(emp => (
                  <tr key={emp.id}>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>
                      {emp.checkedIn
                        ? <span className="badge bg-success">Checked In</span>
                        : <span className="badge bg-danger">Not Checked In</span>
                      }
                    </td>
                    <td>{emp.checkInTime ? new Date(emp.checkInTime).toLocaleString() : '—'}</td>
                  </tr>
                ))}
                {employees.length === 0 && (
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
  )
}

export default Home
