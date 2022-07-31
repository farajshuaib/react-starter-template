import React, {useEffect} from "react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { useRegisterSW } from "virtual:pwa-register/react";
import { store } from "../store";
import { useNetworkState } from "react-use";
import { toast } from "react-toastify"



import "./firebase";

const intervalMS = 60 * 60 * 1000;

interface prop {
  children: React.ReactNode;
}

const Wrapper: React.FunctionComponent<prop> = ({ children }) => {
  const networkState = useNetworkState();

  useRegisterSW({
    onRegistered(r) {
      r &&
        setInterval(() => {
          r.update();
        }, intervalMS);
    },
  });

  useEffect(() => {
    if (!networkState.online) {
      toast.error("no internet connection", {
        closeButton: false,
        position: "top-center",
      });
    }
  }, [networkState]);


  return (
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
  );
};



export default Wrapper;
