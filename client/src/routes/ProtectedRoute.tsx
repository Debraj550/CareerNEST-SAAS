import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type Props = {};

const ProtectedRoute = (props: Props) => {
  const authContext = useContext(AuthContext);
  const isAuthenticated = authContext?.user.status;

  return <div>{!isAuthenticated ? <Outlet /> : <Navigate to="/home" />}</div>;
};

export default ProtectedRoute;
