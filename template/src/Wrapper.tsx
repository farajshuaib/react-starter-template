import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./store";

const Wrapper: React.FC = ({ children }) => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          {children}
          <ToastContainer
            hideProgressBar={true}
            closeOnClick
            rtl={true}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

document.onkeydown = function (e) {
  if (e.keyCode === 123) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode === "I".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode === "C".charCodeAt(0)) {
    return false;
  }
  if (e.metaKey && e.shiftKey && e.keyCode === "C".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.shiftKey && e.keyCode === "J".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode === "U".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode === "E".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode === "S".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode === "H".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode === "A".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode === "F".charCodeAt(0)) {
    return false;
  }
  if (e.ctrlKey && e.keyCode === "E".charCodeAt(0)) {
    return false;
  }
};

export default Wrapper;
