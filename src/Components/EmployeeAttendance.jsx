import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import moment from "moment";

const EmployeeAttendance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [attendance, setAttendance] = useState([]);
  const [totalLeaves, setTotalLeaves] = useState(0);
  const [month, setMonth] = useState(moment().format("YYYY-MM")); // default current month

  // ✅ Fetch Attendance Data
  useEffect(() => {
    axios
      .get(`${backend_url}/employee/attendance/${id}/${month}`)
      .then((res) => {
        if (res.data.Status) {
          setAttendance(res.data.attendance || []);
          setTotalLeaves(res.data.totalLeaves || 0);
        }
      })
      .catch((err) => console.log(err));
  }, [id, month]);

  const handleMonthChange = (e) => {
    setMonth(e.target.value);
  };

  // ✅ Logout
  const handleLogout = () => {
    axios.get(`${backend_url}/employee/logout`).then((res) => {
      if (res.data.Status) {
        localStorage.removeItem("validUser");
        navigate("/");
      }
    });
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        className="bg-dark text-white p-3 d-flex flex-column"
        style={{ width: "250px", height: "100vh" }}
      >
        <h4 className="text-center mb-4">Employee Panel</h4>

        <nav className="nav flex-column flex-grow-1">
          <Link to={`/employee_detail/${id}`} className="nav-link text-white mb-2">
            My Profile
          </Link>
          <Link to={`/employee_detail/${id}/attendance`} className="nav-link text-white mb-2">
            Attendance
          </Link>
          <Link to={`/employee_detail/${id}/tasks`} className="nav-link text-white mb-2">
            View Tasks
          </Link>
        </nav>

        {/* ✅ Logout button fixed at bottom */}
        <div className="mt-auto">
          <button className="btn btn-danger w-100" onClick={handleLogout}>
            <i className="bi bi-power"></i> Logout
          </button>
        </div>
      </aside>

      {/* Main Dashboard Content */}
      <main className="flex-grow-1">
        <div className="container mt-4">
          <h2>Attendance for {moment(month).format("MMMM YYYY")}</h2>

          {/* Month Selector */}
          <div className="mb-3">
            <label className="form-label">Select Month:</label>
            <input
              type="month"
              className="form-control w-auto"
              value={month}
              onChange={handleMonthChange}
            />
          </div>

          <p>
            <strong>Total Leaves Taken:</strong> {totalLeaves}
          </p>

          {/* Attendance Table */}
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Date</th>
                  <th>Check-in</th>
                  <th>Check-out</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendance.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center">
                      No records found
                    </td>
                  </tr>
                ) : (
                  attendance.map((record, index) => (
                    <tr key={index}>
                      <td>{moment(record.date).format("YYYY-MM-DD")}</td>
                      <td>
                        {record.checkInTime
                          ? moment(record.checkInTime).format("HH:mm:ss")
                          : "-"}
                      </td>
                      <td>
                        {record.checkOutTime
                          ? moment(record.checkOutTime).format("HH:mm:ss")
                          : "-"}
                      </td>
                      <td>{record.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmployeeAttendance;
