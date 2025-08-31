import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Home from './Components/Home';
import Employee from './Components/Employee';
import Category from './Components/Category';
import Profile from './Components/Profile';
import AddCategory from './Components/AddCategory';
import AddEmployee from './Components/AddEmployee';
import EditEmployee from './Components/EditEmployee';
import Start from './Components/Start';
import EmployeeLogin from './Components/EmployeeLogin';
import EmployeeDetail from './Components/EmployeeDetail';
import PrivateRoute from './Components/PrivateRoute';
import AssignTask from './Components/AssignTask';
import EmployeeTasks from './Components/EmployeeTasks';
import EmployeeAttendance from './Components/EmployeeAttendance';
import EmployeeDashboard from './Components/EmployeeDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Start />} />
        <Route path='/adminlogin' element={<Login />} />
        <Route path='/employee_login' element={<EmployeeLogin />} />
        <Route path='/employee_detail/:id' element={<EmployeeDetail />} />
        <Route path='/employee_detail/:id/attendance' element={<EmployeeAttendance />} />
        <Route path='/tasks/:id' element={<EmployeeTasks />} />
        <Route path='/employee/dashboard' element={<EmployeeDashboard />} />

        {/* Protected admin dashboard routes */}
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* Nested admin dashboard routes */}
          <Route index element={<Home />} />
          <Route path='employee' element={<Employee />} />
          <Route path='category' element={<Category />} />
          <Route path='profile' element={<Profile />} />
          <Route path='add_category' element={<AddCategory />} />
          <Route path='add_employee' element={<AddEmployee />} />
          <Route path='edit_employee/:id' element={<EditEmployee />} />
          <Route path='tasks' element={<AssignTask />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
