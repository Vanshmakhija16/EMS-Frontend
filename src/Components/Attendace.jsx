import axios from "axios";
import React, { useEffect, useState } from "react";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);

  // Fetch all employees' attendance
  useEffect(() => {
    axios      .get(`${backend_url}/employee/attendance`)
      .then((result) => {
        if (result.data.Status) {
          setAttendance(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="px-5 mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="fw-bold text-primary">
          <i className="bi bi-calendar-check me-2"></i> Attendance Records
        </h3>
      </div>

      {/* Table */}
      <div className="card shadow-sm border-0 rounded-3">
        <div className="card-body p-0">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th className="text-secondary fw-semibold">#</th>
                <th className="text-secondary fw-semibold">Employee Name</th>
                <th className="text-secondary fw-semibold">Date</th>
                <th className="text-secondary fw-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.length > 0 ? (
                attendance.map((a, index) => (
                  <tr key={index}>
                    <td className="fw-medium">{index + 1}</td>
                    <td>{a.name}</td>
                    <td>{new Date(a.date).toLocaleDateString()}</td>
                    <td>
                      {a.status === "Present" ? (
                        <span className="badge bg-success">Present</span>
                      ) : (
                        <span className="badge bg-danger">Absent</span>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-muted py-3">
                    <i className="bi bi-exclamation-circle me-2"></i> No
                    attendance records found
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

export default Attendance;
