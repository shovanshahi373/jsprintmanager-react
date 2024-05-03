import React from "react";

import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex-1 flex items-center justify-center w-9/12 py-4 bg-white m-auto">
        {children}
      </div>
    </div>
  );
};

export default Layout;
