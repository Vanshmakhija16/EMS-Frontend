 import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './AddEmployee.css'; // for custom styles
const backend_url = import.meta.env.VITE_BACKEND_URL;


const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    password: "",
    salary: "",
    address: "",
    category_id: "",
    image: "",
  });
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${backend_url}/auth/category`)
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
 
    console.log("Before axios");
    
   axios
  .post(`${backend_url}/auth/add_employee`, {
      name: employee.name,
      email: employee.email,
      password: employee.password,
      address: employee.address,
      salary: Number(employee.salary),
      category_id: Number(employee.category_id)
  })
  .then((result) => {
    if (result.data.Status) {
      navigate("/dashboard/employee");
    } else {
      const message = typeof result.data.Error === "object"
        ? JSON.stringify(result.data.Error)
        : result.data.Error;
      alert(message);
    }
  })
  .catch((err) => console.log("There is an error",err));
  }
  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="employee-card p-4 rounded shadow-lg w-50">
        <h2 className="text-center mb-4 text-primary">Add Employee</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inputName" className="form-label fw-bold">
              Name
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label fw-bold">
              Email
            </label>
            <input
              type="email"
              className="form-control form-control-lg"
              id="inputEmail"
              placeholder="Enter Email"
              onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputPassword" className="form-label fw-bold">
              Password
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="inputPassword"
              placeholder="Enter Password"
              onChange={(e) => setEmployee({ ...employee, password: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputSalary" className="form-label fw-bold">
              Salary
            </label>
            <input
              type="number"
              className="form-control form-control-lg"
              id="inputSalary"
              placeholder="Enter Salary"
              onChange={(e) => setEmployee({ ...employee, salary: Number(e.target.value) })}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="inputAddress" className="form-label fw-bold">
              Address
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="inputAddress"
              placeholder="1234 Main St"
              onChange={(e) => setEmployee({ ...employee, address: e.target.value })}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="category" className="form-label fw-bold">
              Category
            </label>
            {/* <select
              id="category"
              className="form-select form-select-lg"
              onChange={(e) => setEmployee({ ...employee, category_id: Number(e.target.value) })}
              required
            >
              <option value="">Select Category</option>
              {category.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select> */}

            
           <select
              id="category"
              className="form-select form-select-lg"
              v
              onChange={(e) =>
                setEmployee({ ...employee, category_id: Number(e.target.value) })
              }
              required
            >
              <option value=""  >
                Select Category
              </option>
              {category.map((c) => (
                <option key={c.Id} value={c.Id}>
                  {c.name}
                </option>
              ))}
            </select>

          </div>



    

          <button type="submit" className="btn btn-primary btn-lg w-100">
            Add Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;





