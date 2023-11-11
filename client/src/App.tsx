import React from "react";
import { Header } from "./components/Header";
import Signup from "./components/Signup";
import { Route, Routes } from "react-router-dom";
import Signin from "./components/Signin";
import ErrorPage from "./pages/ErrorPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/" element={<Signup />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
