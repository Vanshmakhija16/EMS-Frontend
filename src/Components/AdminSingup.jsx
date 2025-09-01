import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const backend_url = import.meta.env.VITE_BACKEND_URL;

const AdminSignup = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()
  axios.defaults.withCredentials = true;

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    axios.post(`${backend_url}/auth/adminsignup`, {
      email: values.email,
      password: values.password
    })
      .then(res => {
        if (res.data.Status) {
          setSuccess("Signup successful! Redirecting to login...")
          setTimeout(() => navigate('/adminlogin'), 2000)
        } else {
          setError(res.data.Error || "Signup failed")
        }
      })
      .catch(err => {
        setError("Server error: " + (err.response?.data?.Error || err.message))
      })
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Admin Signup</h2>
        <p className="login-subtitle">Create your admin account</p>

        {error && <div className="error-text">{error}</div>}
        {success && <div style={{ color: "green", marginBottom: '10px' }}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={values.password}
              onChange={(e) => setValues({ ...values, password: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={values.confirmPassword}
              onChange={(e) => setValues({ ...values, confirmPassword: e.target.value })}
              required
            />
          </div>

          <button className="btn-login" type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  )
}

export default AdminSignup
