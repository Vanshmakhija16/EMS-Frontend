import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,Link , useNavigate } from 'react-router-dom';


const EmployeeTasks = () => {
  const { id } = useParams();
  const [tasks, setTasks] = useState([]);

  
   const fetchTasks = () => {
    axios.get(`${backend_url}/task/employee/${id}`)
      .then(res => { if (res.data.Status) setTasks(res.data.Result); });

   };

   useEffect(() => { fetchTasks(); }, [id]) 

   
  const handleStatusChange = (taskId, newStatus) => {
      console.log('Updating task', taskId, 'to status', newStatus);
      if (!taskId) return alert('Task ID is missing!');
      console.log("Changed")
      axios.put(`${backend_url}/task/updateStatus/${taskId}`, { status: newStatus })
      .then(res => { 
        console.log(taskId)
        if (res.data.Status) fetchTasks(); });
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
  <div className="d-flex" style={{ minHeight: "100vh" }}>
    {/* Sidebar */}
    <aside className="d-flex flex-column justify-content-between p-3 bg-dark text-white" 
           style={{ width: "250px" }}>
      <div>
        <nav className="nav flex-column">
          <Link to={`/employee_detail/${id}`} className="nav-link text-white mb-2">My Profile</Link>
          <Link to="/employee/dashboard" className="nav-link text-white mb-2">Dashboard</Link>
          <Link to={`/tasks/${id}`} className="nav-link btn btn-info text-white text-start">
            View Tasks
          </Link>
        </nav>
      </div>
      <button className="btn btn-danger logout-btn w-100" onClick={handleLogout}>
        <i className="bi bi-power"></i> Logout
      </button>
    </aside>

    {/* Main Content */}
    <main className="flex-grow-1 p-4">
      <h3>Your Tasks</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th><th>Description</th><th>Due Date</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.Id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.due_date}</td>
              <td>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(task.Id, e.target.value)}
                  className="form-control"
                >
                  <option value="Pending">Pending</option>
                  <option value="Working">Working</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  </div>
);

};

export default EmployeeTasks;