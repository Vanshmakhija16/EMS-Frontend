import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';

const backend_url = import.meta.env.VITE_BACKEND_URL;

const EmployeeDetail = () => {
  const officeLocation = { lat: 26.9136, lng: 75.7858 };
  const { id } = useParams();
  const navigate = useNavigate();

  const [checkedIn, setCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [error, setError] = useState('');
  const [employee, setEmployee] = useState(null);

  // Guard: Check if id exists
  useEffect(() => {
    if (!id) {
      setError("Employee ID is missing from URL");
      return;
    }

    // Fetch employee data
    axios.get(`${backend_url}/employee/detail/${id}`)
      .then(result => {
        const emp = result.data?.employee;
        if (result.data?.Status && emp) {
          setEmployee(emp);
          setCheckedIn(!!emp.checkedIn);
          setCheckInTime(emp.checkInTime);
          setCheckOutTime(emp.checkOutTime);
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
        setError("Failed to fetch employee data");
        console.error(err);
      });
  }, [id]);

  const isCloseToOffice = (userLat, userLng) => {
    const distanceThreshold = 1; // ~1km radius
    return (
      Math.abs(userLat - officeLocation.lat) < distanceThreshold &&
      Math.abs(userLng - officeLocation.lng) < distanceThreshold
    );
  };

  const handleCheckIn = () => {
    if (!id) return setError("Employee ID missing. Cannot check in.");

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

        // Update employee table
        axios.post(`${backend_url}/employee/checkin`, {
          employeeId: id,
          checkInTime: now.toISOString(),
        }).catch(err => console.error("Employee check-in failed:", err));

        // Update attendance table
        axios.post(`${backend_url}/employee/attendance/checkin`, { employeeId: id })
          .then(res => {
            if (!res.data?.Status) {
              setError(res.data?.Error || 'Attendance table check-in failed');
            }
          })
          .catch(err => setError('Attendance table check-in failed'));
      },
      () => setError('Unable to retrieve your location.'),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  const handleCheckOut = () => {
    if (!id) return setError("Employee ID missing. Cannot check out.");

    const now = new Date();
    setCheckedIn(false);
    setCheckOutTime(now.toISOString());

    // Update employee table
    axios.post(`${backend_url}/employee/checkout`, {
      employeeId: id,
      checkOutTime: now.toISOString(),
    }).catch(err => console.error("Employee check-out failed:", err));

    // Update attendance table
    axios.post(`${backend_url}/employee/attendance/checkout`, { employeeId: id })
      .then(res => {
        if (!res.data?.Status) {
          setError(res.data?.Error || 'Attendance table check-out failed');
        }
      })
      .catch(err => setError('Attendance table check-out failed'));
  };

  const handleLogout = () => {
    axios.get(`${backend_url}/employee/logout`)
      .then(result => {
        if (result.data?.Status) {
          localStorage.removeItem("valid");
          navigate('/');
        }
      }).catch(err => console.error(err));
  };

  // Render guard if ID missing
  if (!id) return <p className="text-danger p-4">Error: Employee ID is missing in the URL</p>;

  return (
    <div className="employee-detail-container d-flex">
      {/* Sidebar */}
      <aside className="sidebar d-flex flex-column justify-content-between p-3 bg-dark text-white" style={{ width: "250px", height: "100vh" }}>
        <nav className="nav flex-column">
          <Link to={`/employee_detail/${id}`} className="nav-link text-white mb-2">My Profile</Link>
          <Link to="/employee/dashboard" className="nav-link text-white mb-2">Dashboard</Link>
          <Link to={`/tasks/${id}`} className="nav-link btn btn-info text-white text-start">View Tasks</Link>
          <Link to={`/employee_detail/${id}/attendance`} className="nav-link btn btn-info text-white text-start">Attendance</Link>
        </nav>
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
              <button className="btn btn-success mt-3" onClick={handleCheckIn}>Check In</button>
            ) : (
              <button className="btn btn-warning mt-3" onClick={handleCheckOut}>Check Out</button>
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
