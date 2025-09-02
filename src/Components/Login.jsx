import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const backend_url = import.meta.env.VITE_BACKEND_URL;

const Login = () => {
    const [error, setError] = useState()
    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    axios.defaults.withCredentials = true;

     const handleSubmit = (e) => {
        e.preventDefault()

        axios.post(`${backend_url}/auth/adminlogin`, values)
            .then(result => {
                if (result.data.loginStatus) {
                    localStorage.setItem("valid", "true");
                    navigate('/dashboard')
                } else {
                    setError(result.data.Error)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-title">Admin Login</h2>
                <p className="login-subtitle">Enter your credentials to access the system</p>
                
                {error && <div className="error-text">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email"
                            placeholder="Enter your email"
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password"
                            placeholder="Enter your password"
                            onChange={(e) => setValues({ ...values, password: e.target.value })}
                        />
                    </div>

                    <button className="btn-login">Login</button>
                </form>

            </div>
        </div>
    )
}

export default Login
