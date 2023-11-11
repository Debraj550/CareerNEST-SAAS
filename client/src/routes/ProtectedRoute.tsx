import React from "react";
import useAuth from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";

type Props = {};

const ProtectedRoute = (props: Props) => {
  const auth = useAuth();

  return <div>{!auth ? <Outlet /> : <Navigate to="/" />}</div>;
};

export default ProtectedRoute;
