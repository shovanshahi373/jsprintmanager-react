import React from "react";
import { useContext } from "../hooks/useContext";

const Header = () => {
  const { status, STATUS, loading } = useContext();
  const mapcolors = {
    [STATUS.OPEN]: "bg-green-500",
    [STATUS.CLOSED]: "bg-red-500",
    [STATUS.NO_RESPONSE]: "bg-grey-500",
  };
  const classNames = mapcolors[status];
  return (
    <div className="flex justify-between items-center p-4 bg-slate-950 text-white">
      <div>
        <h1 className="text-3xl font-bold">JSPrintManager</h1>
      </div>
      <div className="flex items-center gap-2">
        <span>JSPM WebSocket Connection</span>
        {loading ? null : (
          <span className={`${classNames} rounded-sm px-2`}>{status}</span>
        )}
      </div>
    </div>
  );
};

export default Header;
