import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

const EmployeeLogin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    employeeId: ''
  })
  const [error, setError] = useState(null)
  const navigate = useNavigate()
  axios.defaults.withCredentials = true

const handleSubmit = async (event) => {
  event.preventDefault()
  try {
    // ✅ Call full backend URL with /employee prefix
    const response = await axios.get(`${backend_url}/employee/idbyemail`, { 
      params: { email: values.email } 
    })

    if (!response.data.employeeId) {
      setError("Employee ID not found for this email.")
      return
    }

    console.log("Id", response.data.employeeId)
    const employeeId = response.data.employeeId

    const updatedValues = { ...values, employeeId }
    console.log(updatedValues)

    // ✅ Same for login
    const result = await axios.post(`${backend_url}/employee/employee_login`, updatedValues)

    if (result.data.loginStatus) {
      localStorage.setItem("valid", true)
      navigate('/employee_detail/' + result.data.id)
    } else {
      setError(result.data.Error)
    }
  } catch (error) {
    console.error("Error during login:", error)
    setError("Something went wrong. Please try again.")
  }
}

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100" style={{ background: "#f8faff" }}>
      
      {/* Back Link */}
<div 
  className="position-absolute top-0 start-0 mt-3 ms-3"
>
  <Link to="/" className="text-decoration-none text-primary fw-semibold">
    <i className="bi bi-arrow-left me-1"></i> Back to Home
  </Link>
</div>


      {/* Card */}
      <div className="card shadow-lg border-0 rounded-4 p-4" style={{ width: "400px" }}>
        <div className="card-body">
          {error && <div className="alert alert-danger py-2">{error}</div>}
          
          <h3 className="text-center fw-bold mb-2">Employee Login</h3>
          <p className="text-center text-muted mb-4">Enter your credentials to access the system</p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="fw-semibold">Email</label>
              <input 
                type="email" 
                className="form-control rounded-3" 
                placeholder="Enter your email"
                onChange={(e) => {
                  console.log(e.target.value);
                  
                  setValues({ ...values, email: e.target.value })}}
              />
            </div>
            <div className="mb-3">
              <label className="fw-semibold">Password</label>
              <input 
                type="password" 
                className="form-control rounded-3" 
                placeholder="Enter your password"
                onChange={(e) => setValues({ ...values, password: e.target.value })}
              />
            </div>
            <button className="btn btn-dark w-100 rounded-3 py-2">Login</button>
          </form>

         
          </div>
        </div>
      </div>


  )
}

export default EmployeeLogin
