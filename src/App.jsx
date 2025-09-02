import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminSignup from './Components/AdminSignup';
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
  // Collect all top-level routes into an array for logging
  const publicRoutes = [
    { path: "/", element: <Start /> },
    { path: "/adminlogin", element: <Login /> },
    { path: "/adminsignup", element: <AdminSignup /> },
    { path: "/employee_login", element: <EmployeeLogin /> },
    { path: "/employee_detail/:id", element: <EmployeeDetail /> },
    { path: "/employee_detail/:id/attendance", element: <EmployeeAttendance /> },
    { path: "/tasks/:id", element: <EmployeeTasks /> },
    { path: "/employee/dashboard", element: <EmployeeDashboard /> },
  ];

  const dashboardRoutes = [
    { path: "", element: <Home /> }, // index route
    { path: "employee", element: <Employee /> },
    { path: "category", element: <Category /> },
    { path: "profile", element: <Profile /> },
    { path: "add_category", element: <AddCategory /> },
    { path: "add_employee", element: <AddEmployee /> },
    { path: "edit_employee/:id", element: <EditEmployee /> },
    { path: "tasks", element: <AssignTask /> },
  ];

  // 🔎 Debug logging: print all routes before rendering
  console.log("🔍 Public Routes:");
  publicRoutes.forEach(r => console.log(" -", r.path));

  console.log("🔍 Dashboard Routes:");
  dashboardRoutes.forEach(r => console.log(" -", r.path));

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        {publicRoutes.map(r => (
          <Route key={r.path} path={r.path} element={r.element} />
        ))}

        {/* Protected admin dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          {dashboardRoutes.map(r => {
            // 🔒 Runtime guard: check for invalid or suspicious paths
            if (r.path === undefined || r.path === null) {
              throw new Error(`Invalid route path detected: ${r.path}`);
            }
            if (typeof r.path === "string" && r.path.includes(":/") && !r.path.includes(":id")) {
              throw new Error(`Suspicious route path detected: ${r.path}`);
            }

            return (
              <Route
                key={r.path || "index"}
                index={r.path === ""}
                path={r.path || undefined}
                element={r.element}
              />
            );
          })}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
