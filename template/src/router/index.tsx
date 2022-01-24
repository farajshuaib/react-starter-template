import React from "react";

import { Navigate } from "react-router-dom";

import Login from "../screens/auth/Login";
import { Layout } from "../components";

import { useAppSelector } from "../store";

const Routes = () => {
  const userData = useAppSelector((state) => state.auth.userData);
  return [
    {
      path: "/",
      element: userData ? <Layout /> : <Navigate to="/login" />,
      // protected routes
      children: [
        {
          path: 'home',
          element: <div></div>
        }
      ],
    },
    {
      // public routes
      path: "/login",
      element: !userData ? <Login /> : <Navigate to="/" />,
    },
    {
      // public routes
      path: "/forget-password",
      element: !userData ? <div></div> : <Navigate to="/" />,
    },
  ];
};

export default Routes;
