import React from "react";
import { Navigate } from "react-router-dom";
import { getToken } from "../service/AuthServise";

const PublicRoute = ({ element: Component }) => {
  return !getToken() ? Component : <Navigate to="/home" />;
};

export default PublicRoute;
