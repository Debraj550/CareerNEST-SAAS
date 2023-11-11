import React from "react";
import useAuth from "../hooks/useAuth";

type Props = {};

const ProtectedRoute = (props: Props) => {
  const auth = useAuth();
  return <div></div>;
};

export default ProtectedRoute;
