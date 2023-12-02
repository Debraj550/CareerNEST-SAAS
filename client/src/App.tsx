import React, { useContext } from "react";
import { Header } from "./components/Header";
import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import Signin from "./components/Signin";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import JobsPage from "./pages/JobsPage";
import AdminPage from "./pages/AdminPage";
import { AuthContext } from "./context/AuthContext";
import EmployeeOnboarding from "./components/EmployeeOnboarding";
import DiscussionPage from "./pages/DiscussionPage";
import ProfilePage from "./pages/ProfilePage";
import LeaveApplicationPage from "./pages/LeaveApplicationPage";
import CreateJobsPage from "./pages/CreateJobsPage";

function App() {
  const authContext = useContext(AuthContext);
  const isLoggedin = authContext?.user.status;
  const isTenant = authContext?.user.isTenant;

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Route>
        <Route
          path="/home"
          element={
            isLoggedin ? isTenant ? <AdminPage /> : <JobsPage /> : <Signin />
          }
        ></Route>
        <Route
          path="/discussion"
          element={isLoggedin ? <DiscussionPage /> : <Signin />}
        ></Route>
        <Route
          path="/leave"
          element={isLoggedin ? <LeaveApplicationPage /> : <Signin />}
        ></Route>
        <Route
          path="/profile"
          element={isLoggedin ? <ProfilePage /> : <Signin />}
        ></Route>
        <Route
          path="/jobs"
          element={isTenant ? <CreateJobsPage /> : <ErrorPage />}
        ></Route>
        <Route
          path="/employee_onboard"
          element={isTenant ? <EmployeeOnboarding /> : <ErrorPage />}
        ></Route>
        <Route
          path="/admin"
          element={isTenant ? <AdminPage /> : <ErrorPage />}
        ></Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
