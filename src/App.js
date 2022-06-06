import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import ParentDashboardHome from "./components/ParentDashboardHome";
import ParentDashboardAddChild from "./components/ParentDashboardAddChild";
import Login from "./pages/LoginPage/Login";
import ParentDashboard from "./pages/ParentDashbord/ParentDashboard";
import ParentDashboardStartPage from "./pages/ParentDashbord/ParentDashboardStartPage/ParentDashboardStartPage";
import Signup from "./pages/SignupPage/Signup";
import ParentDashboardEvents from "./components/ParentDashboardEvents";
import ParentDashboardProfile from "./components/ParentDashboardProfile";
import ParentDashboardLogout from "./components/ParentDashboardLogout";
import EmployeeDashboard from "./pages/EmployeeDashbord/EmployeeDashboard";
import EmployeeDashboardHome from "./components/EmployeeDashboardHome";
import EmployeeDashboardEvents from "./components/EmployeeDashboardEvents";
import EmployeeDashboardApplication from "./components/EmployeeDashboardApplication";
import EmployeeDashboardLogout from "./components/EmployeeDashboardLogout";
import ParentApplicationApproval from "./components/ParentApplicationApproval";
import ProtectedRouteForParentDashboard from "./utils/protectedRoutes/ProtectedRouteForParentDashboard";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminSignupPage from "./pages/admin/AdminSignupPage";
import ProtectedRouteForEmployeeDashboard from "./utils/protectedRoutes/ProtectedRouteForEmployeeDashboard";

function App() {
  return (
    <main>
      <Router>
        <Routes>
          {/* login for parent */}
          <Route
            exact
            path="/"
            element={
              <>
                <Login />
              </>
            }
          ></Route>
          {/* signup for parent */}
          <Route
            exact
            path="/signup"
            element={
              <>
                <Signup />
              </>
            }
          ></Route>
          {/* login for admin */}
          <Route
            exact
            path="/admin/login"
            element={
              <>
                <AdminLoginPage />
              </>
            }
          ></Route>
          {/* signup for admin */}
          <Route
            exact
            path="/admin/signup"
            element={
              <>
                <AdminSignupPage />
              </>
            }
          ></Route>
          <Route exact path="/" element={<ProtectedRouteForParentDashboard />}>
            <Route
              exact
              path="/p/dashboard"
              element={
                <>
                  <ParentDashboard />
                </>
              }
            >
              <Route
                path="/p/dashboard"
                element={<Navigate replace to="home" />}
              ></Route>
              <Route
                path="home"
                element={
                  <>
                    <ParentDashboardHome />
                  </>
                }
              ></Route>
              <Route
                path="add-child"
                element={
                  <>
                    <ParentDashboardAddChild />
                  </>
                }
              ></Route>
              <Route
                path="events"
                element={
                  <>
                    <ParentDashboardEvents />
                  </>
                }
              ></Route>
              <Route
                path="profile"
                element={
                  <>
                    <ParentDashboardProfile />
                  </>
                }
              ></Route>
              <Route
                path="logout"
                element={
                  <>
                    <ParentDashboardLogout />
                  </>
                }
              ></Route>
            </Route>
          </Route>
          {/* start page */}
          <Route
            exact
            path="/p/dashboard/start"
            element={
              <>
                <ParentDashboardStartPage />
              </>
            }
          ></Route>
          {/* pending page */}
          <Route
            path="pending"
            element={
              <>
                <ParentApplicationApproval />
              </>
            }
          ></Route>
          {/* employee dashboard */}
          <Route
            exact
            path="/"
            element={
              <>
                <ProtectedRouteForEmployeeDashboard />
              </>
            }
          >
            <Route
              exact
              path="/e/dashboard"
              element={
                <>
                  <EmployeeDashboard />
                </>
              }
            >
              <Route
                path="/e/dashboard"
                element={<Navigate replace to="home" />}
              ></Route>
              <Route
                path="home"
                element={
                  <>
                    <EmployeeDashboardHome />
                  </>
                }
              ></Route>
              <Route
                path="events"
                element={
                  <>
                    <EmployeeDashboardEvents />
                  </>
                }
              ></Route>
              <Route
                path="application"
                element={
                  <>
                    <EmployeeDashboardApplication />
                  </>
                }
              ></Route>
              <Route
                path="logout"
                element={
                  <>
                    <EmployeeDashboardLogout />
                  </>
                }
              ></Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </main>
  );
}

export default App;
