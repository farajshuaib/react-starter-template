import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import { store } from "./store";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import Wrapper from "./Wrapper";


import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/index.css";


const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <Wrapper>
    <App />
  </Wrapper>
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
