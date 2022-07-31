import React from "react";

import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div>
      {/* wrape your layout here... */}

    {/* example navbar */}
    {/* example header */}

    <main>
      <Outlet />
    </main>


      {/* example footer */}
    </div>
  );
};

export default Layout;
