import React from "react";
import { LoadingIcon } from "../icons";

const Loader = () => {
  return (
    <div className="animate-spin">
      <LoadingIcon />
    </div>
  );
};

export default Loader;
