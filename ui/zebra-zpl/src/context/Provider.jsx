import React, { createContext, useContext as _useContext } from "react";
import useJSPM, { STATUS } from "../hooks/useJSPM";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  const {
    error,
    handleSelectPrinter,
    print,
    printers,
    selectedPrinter,
    status,
    loading,
    reload,
  } = useJSPM();
  return (
    <Context.Provider
      value={{
        error,
        handleSelectPrinter,
        print,
        printers,
        selectedPrinter,
        status,
        loading,
        STATUS,
        reload,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
