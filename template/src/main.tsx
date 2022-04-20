import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import Wrapper from "./Wrapper";


import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/index.css";


const app: any = document.getElementById("app");

const root = createRoot(app);

root.render(
  <Wrapper>
    <App />
  </Wrapper>
);


