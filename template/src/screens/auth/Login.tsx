import React, { useState } from "react";
import { Formik, Form } from "formik";
import { loginSchema } from "../../services/validation";

import { useAppDispatch } from "../../store";
import { login } from "../../store/actions/auth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return <div>
    login screen
  </div>;
};

export default Login;
