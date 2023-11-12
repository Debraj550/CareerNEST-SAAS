import React from "react";
import useAuth from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

type Props = {};

const ProtectedRoute = (props: Props) => {
  const [isLoggedin] = useAuth();

  return <div>{!isLoggedin ? <Outlet /> : <Navigate to="/jobs" />}</div>;
};

export default ProtectedRoute;
