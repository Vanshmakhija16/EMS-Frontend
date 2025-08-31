import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AssignTask = () => {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    employee_id: '',
    title: '',
    description: '',
    due_date: ''
  });
  const [message, setMessage] = useState('');

  

  useEffect(() => {
    axios.get(`${backend_url}/auth/employee`)
      .then(res => {
        if (res.data.Status) setEmployees(res.data.Result);
      });
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    axios.get(`${backend_url}/task/all`)
      .then(res => {
        if (res.data.Status) setTasks(res.data.Result);
      });
  };

const handleChange = (e) => {
    
  console.log(e.target.name, e.target.value); // debug log selected value
  setForm({ ...form, [e.target.name]: e.target.value });
};


const handleSubmit = e => {
  e.preventDefault();
  
   console.log('Employees:', employees);
  const selectedEmployeeId = e.target.value; // string
  const selectedEmployee = employees.find(emp => String(emp.Id) === selectedEmployeeId);
  console.log("Selected employee object:", selectedEmployee);

  setForm({ ...form, [e.target.name]: selectedEmployeeId });

  if (!form.employee_id) {
    alert("Select Employee");
    setMessage("Please select an employee.");
    return;
  }
  // Only convert if employee_id is valid and non-empty
  console.log((form.employee_id))
  const payload = { ...form, employee_id: Number(form.employee_id) };
  axios.post(`${backend_url}/task/assign`, payload)
    .then(res => {
      if (res.data.Status) {
        setMessage('Task assigned!');
        setForm({ employee_id: '', title: '', description: '', due_date: '' });
        fetchTasks();
      } else {
        setMessage(res.data.Error);
      }
    });
};


  return (
    <div className="container mt-4">
     
    {message && <div className="alert alert-info">{message}</div>}
  <div className="d-flex justify-content-center align-items-center">
    <div className="col-md-6">
      <form onSubmit={handleSubmit} className="p-4 shadow rounded bg-light">
        <h4 className="mb-3 text-primary text-center">Assign Task</h4>

        <div className="mb-3">
          <label className="form-label fw-semibold">Employee</label>
          <select 
            name="employee_id" 
            value={form.employee_id} 
            onChange={handleChange} 
            className="form-select" 
            required
          >
            <option value="">Select Employee</option>
            {employees.map(emp => (
              <option key={emp.Id} value={emp.Id}>{emp.name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Title</label>
          <input 
            type="text" 
            name="title" 
            value={form.title} 
            onChange={handleChange} 
            className="form-control" 
            placeholder="Enter task title"
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Description</label>
          <textarea 
            name="description" 
            value={form.description} 
            onChange={handleChange} 
            className="form-control" 
            rows="3"
            placeholder="Enter task details"
            required 
          />
        </div>

        <div className="mb-3">
          <label className="form-label fw-semibold">Due Date</label>
          <input 
            type="date" 
            name="due_date" 
            value={form.due_date} 
            onChange={handleChange} 
            className="form-control" 
            required 
          />
        </div>

        <button className="btn btn-primary w-100">
          <i className="bi bi-check-circle me-2"></i> Assign Task
        </button>
      </form>
    </div>
  </div>

<div className="mt-5">
  <div className="card shadow rounded">
    <div className="card-header bg-secondary text-white">
      <h4 className="mb-0">📋 All Tasks</h4>
    </div>
    <div className="card-body p-0">
      <table className="table table-striped table-hover mb-0">
        <thead className="table-light">
          <tr>
            <th scope="col">Employee</th>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Due Date</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.employee_name}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.due_date}</td>
              <td>
                <span 
                  className={`badge px-3 py-2 
                    ${task.status === "Completed" ? "bg-success" : 
                      task.status === "Pending" ? "bg-warning text-dark" : 
                      "bg-secondary"}`}
                >
                  {task.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>
</div>
)};
export default AssignTask;