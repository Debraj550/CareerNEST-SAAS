import React, { useContext } from "react";
import { Header } from "./components/Header";
import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import Signin from "./components/Signin";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import JobsPage from "./pages/JobsPage";
import ResumePage from "./pages/ResumePage";
import AdminPage from "./pages/AdminPage";
import { AuthContext } from "./context/AuthContext";
import EmployeeOnboarding from "./components/EmployeeOnboarding";

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
          path="/resume"
          element={isLoggedin ? <ResumePage /> : <Signin />}
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
