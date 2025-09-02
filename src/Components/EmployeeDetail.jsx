import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
const backend_url = import.meta.env.VITE_BACKEND_URL;

const EmployeeDetail = () => {
  const officeLocation = { lat: 26.9136, lng: 75.7858 };

  const isCloseToOffice = (userLat, userLng) => {
    const distanceThreshold = 1; // ~1km radius
    return (
      Math.abs(userLat - officeLocation.lat) < distanceThreshold &&
      Math.abs(userLng - officeLocation.lng) < distanceThreshold
    );
  };

  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [error, setError] = useState('');
  const [employee, setEmployee] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch employee data
  useEffect(() => {
    axios.get(`const backend_url/employee/detail/${id}`)
      .then(result => {
        if (result.data.Status && result.data.employee) {
          setEmployee(result.data.employee);
          setCheckedIn(!!result.data.employee.checkedIn);
          setCheckInTime(result.data.employee.checkInTime);
          setCheckOutTime(result.data.employee.checkOutTime);
        } else if (Array.isArray(result.data) && result.data.length > 0) {
          setEmployee(result.data[0]);
          setCheckedIn(!!result.data[0].checkedIn);
          setCheckInTime(result.data[0].checkInTime);
          setCheckOutTime(result.data[0].checkOutTime);
        } else {
          setEmployee(null);
        }
      })
      .catch(err => {
        setEmployee(null);
        console.log(err);
      });
  }, [id]);

  // Handle Check In
// Handle Check In
const handleCheckIn = () => {
  if (!navigator.geolocation) {
    setError('Geolocation is not supported by your browser');
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      if (!isCloseToOffice(latitude, longitude)) {
        setError('You are not at the office location. Cannot check in.');
        return;
      }

      const now = new Date();
      const cutoffTime = new Date();
      cutoffTime.setHours(18, 45, 0, 0); // 6:45 PM
      if (now > cutoffTime) {
        setError('Check-in time has passed (after 6:45 PM).');
        return;
      }

      setError('');
      setCheckedIn(true);
      setCheckInTime(now.toISOString());
      setCheckOutTime(null);

      // ✅ Update employee table
      axios.post('http://localhost:3000/employee/checkin', {
        employeeId: id,
        checkInTime: now.toISOString(),
      });

      // ✅ Update attendance table
      axios.post('http://localhost:3000/employee/attendance/checkin', {
        employeeId: id,
      })
      .then(res => {
        if (!res.data.Status) {
          setError(res.data.Error || 'Attendance table check-in failed');
        }
      })
      .catch(err => setError('Attendance table check-in failed'));
    },
    () => setError('Unable to retrieve your location.'),
    { enableHighAccuracy: true, timeout: 10000 }
  );
};

// Handle Check Out
const handleCheckOut = () => {
  const now = new Date();
  setCheckedIn(false);
  setCheckOutTime(now.toISOString());

  // ✅ Update employee table
  axios.post('http://localhost:3000/employee/checkout', {
    employeeId: id,
    checkOutTime: now.toISOString(),
  });

  // ✅ Update attendance table
  axios.post('http://localhost:3000/employee/attendance/checkout', {
    employeeId: id,
  })
  .then(res => {
    if (!res.data.Status) {
      setError(res.data.Error || 'Attendance table check-out failed');
    }
  })
  .catch(err => setError('Attendance table check-out failed'));
};


  const handleLogout = () => {
    axios.get(`${backend_url}/employee/logout`)
      .then(result => {
        if (result.data.Status) {
          localStorage.removeItem("valid");
          navigate('/');
        }
      }).catch(err => console.log(err));
  };

  return (
    <div className="employee-detail-container d-flex">
      {/* Sidebar */}
      <aside className="sidebar d-flex flex-column justify-content-between p-3 bg-dark text-white" style={{ width: "250px", height: "100vh" }}>
        <div>
          <nav className="nav flex-column">
            <Link to={`/employee_detail/${id}`} className="nav-link text-white mb-2">My Profile</Link>
            <Link to="/employee/dashboard" className="nav-link text-white mb-2">Dashboard</Link>
            <Link to={`/tasks/${id}`} className="nav-link btn btn-info text-white text-start">View Tasks</Link>
            <Link to={`/employee_detail/${id}/attendance/`} className="nav-link btn btn-info text-white text-start">Attendance</Link>
          </nav>
        </div>

      </aside>

      {/* Main Content */}
      <main className="content p-4 w-100">
        {employee ? (
          <div className="card employee-card shadow p-4">
            <div className="mb-3"><strong>Name:</strong> {employee.name}</div>
            <div className="mb-3"><strong>Email:</strong> {employee.email}</div>
            <div className="mb-3"><strong>Salary:</strong> ${employee.salary}</div>

            <div className="mb-3">
              <strong>Status:</strong>{" "}
              {checkedIn ? (
                <span className="text-success">Checked In</span>
              ) : (
                <span className="text-danger">Not Checked In</span>
              )}
            </div>

            {checkInTime && (
              <div className="mb-2">
                <strong>Check-In Time:</strong> {new Date(checkInTime).toLocaleTimeString()}
              </div>
            )}
            {checkOutTime && (
              <div className="mb-2">
                <strong>Check-Out Time:</strong> {new Date(checkOutTime).toLocaleTimeString()}
              </div>
            )}

            {error && (
              <div className="alert alert-danger" role="alert">{error}</div>
            )}

            {!checkedIn ? (
              <button className="btn btn-success mt-3" onClick={handleCheckIn}>
                Check In
              </button>
            ) : (
              <button className="btn btn-warning mt-3" onClick={handleCheckOut}>
                Check Out
              </button>
            )}
          </div>
        ) : (
          <p>Loading employee data...</p>
        )}
      </main>
    </div>
  );
};

export default EmployeeDetail;
