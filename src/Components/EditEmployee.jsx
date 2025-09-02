import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const backend_url = import.meta.env.VITE_BACKEND_URL;

const EditEmployee = () => {
    const {id} = useParams()
    const [employee, setEmployee] = useState({
        name: "",
        email: "",
        salary: "",
        address: "",
        category_id: "",
      });
      const [category, setCategory] = useState([])
      const navigate = useNavigate()

useEffect(() => {
  // Fetch categories
  axios.get(`${backend_url}/auth/category`)
    .then(res => {
      if(res.data.Status) setCategory(res.data.Result);
      else alert(res.data.Error);
    }).catch(err => console.log(err));

  // Fetch employee
  axios.get(`${backend_url}/auth/employee/${id}`)
    .then(res => {
      const emp = res.data.Result[0];
      setEmployee({
        name: emp.name || '',
        email: emp.email || '',
        salary: emp.salary || '',
        address: emp.address || '',
        category_id: Number(emp.category_id) || '', // convert to number
      });
    }).catch(err => console.log(err));
}, [id]); // dependency on id


    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put(`${backend_url}/auth/edit_employee/${id}`, 
             { ...employee,
               category_id: Number(employee.category_id)})
        .then(result => {
            if(result.data.Status) {
                navigate('/dashboard/employee')
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }
    
  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Employee</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={employee.name}
              onChange={(e) =>
                setEmployee({ ...employee, name: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              value={employee.email}
              onChange={(e) =>
                setEmployee({ ...employee, email: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputSalary" className="form-label">
              Salary
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputSalary"
              placeholder="Enter Salary"
              autoComplete="off"
              value={employee.salary}
              onChange={(e) =>
                setEmployee({ ...employee, salary: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              value={employee.address}
              onChange={(e) =>
                setEmployee({ ...employee, address: e.target.value })
              }
            />
          </div>
          <div className="col-12">
            <label for="category" className="form-label">
              Category
            </label>

            <select
              name="category"
              id="category"
              className="form-select"
               onChange={(e) => setEmployee({...employee, category_id: Number(e.target.value)})}

            >
              {category.map((c) => {
                return <option value={c.id}>{c.name}</option>;
              })}
            </select>
          </div>

          <div className="col-12">
            <button type="submit" className="btn btn-primary w-100">
              Edit Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditEmployee
