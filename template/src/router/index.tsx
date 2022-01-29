import React from "react";

import { Navigate } from "react-router-dom";

import Login from "../screens/auth/Login";
import ForgetPassword from "../screens/auth/ForgetPassword";
import Home from "../screens/Home";
import About from "../screens/About";
import { Layout } from "../components";

import { useAppSelector } from "../store";

const Routes = () => {
  const userData = useAppSelector((state) => state.auth.userData);
  return [
    {
      // main routes
      path: "/",
      element: <Layout />, // force user to login... use this => userData ? <Layout /> : <Navigate to="/login" />,
      // protected routes
      children: [
        {
          path: "home/",
          element: <Home />,
        },
        {
          path: "about/",
          element: <About />,
        },
      ],
    },
    {
      // public routes
      path: "/login",
      element: <Login />, // navigate user to main routers if he's already signed in ... use this => !userData ? <Login /> : <Navigate to="/" />,
    },
    {
      // public routes
      path: "/forget-password",
      element: <ForgetPassword />, // navigate user to main routers if he's already signed in ... use this => !userData ? <Login /> : <Navigate to="/" />,
    },
  ];
};

export default Routes;
