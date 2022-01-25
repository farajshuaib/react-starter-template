import React, { useState, useEffect } from "react";
import { useRoutes } from "react-router-dom";
import router from "./router";
import { useAppDispatch } from "./store";
import { authenticate } from "./store/actions/auth";
import { LoadingScreen } from "./components";
import { useNetworkState } from "react-use";
import { toast } from "react-toastify";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const networkState = useNetworkState();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!networkState.online) {
      toast.error("no internet connection", {
        closeButton: false,
        position: "top-center",
      });
    }
  }, [networkState]);

  const routing = useRoutes(router());

  const isLoggedIn = async () => {
    try {
      await dispatch(authenticate());
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    isLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return routing;
};

export default App;
