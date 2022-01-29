import React from "react";

import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div>
      {/* wrape your layout here... */}
      <Outlet />
    </div>
  );
};

export default Layout;
