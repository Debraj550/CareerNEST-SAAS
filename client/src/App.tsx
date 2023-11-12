import React from "react";
import { Header } from "./components/Header";
import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import Signin from "./components/Signin";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import JobsPage from "./pages/JobsPage";
import useAuth from "./hooks/useAuth";
import ResumePage from "./pages/ResumePage";

function App() {
  const [isLoggedin] = useAuth();
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
          path="/jobs"
          element={isLoggedin ? <JobsPage /> : <Signin />}
        ></Route>
        <Route
          path="/resume"
          element={isLoggedin ? <ResumePage /> : <Signin />}
        ></Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
