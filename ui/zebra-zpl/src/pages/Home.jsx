import React from "react";
import { useContext } from "../hooks/useContext";

import Loader from "../components/Loader";
import Select from "../components/Select";
import Button from "../components/Button";

import { PrintIcon } from "../icons";

import Layout from "../layout";

const command = `^XA
^FO20,30^GB750,1100,4^FS
^FO20,30^GB750,200,4^FS
^FO20,30^GB750,400,4^FS
^FO20,30^GB750,700,4^FS
^FO20,226^GB325,204,4^FS
^FO30,40^ADN,36,20^FDShip to:^FS
^FO30,260^ADN,18,10^FDPart number #^FS
^FO360,260^ADN,18,10^FDDescription:^FS
^FO30,750^ADN,36,20^FDFrom:^FS
^FO150,125^ADN,36,20^FDAcme Printing^FS
^FO60,330^ADN,36,20^FD14042^FS
^FO400,330^ADN,36,20^FDScrew^FS
^FO70,480^BY4^B3N,,200^FD12345678^FS
^FO150,800^ADN,36,20^FDMacks Fabricating^FS
^XZ`;

const HomePage = () => {
  const {
    print,
    printers,
    handleSelectPrinter,
    error,
    loading,
    selectedPrinter,
  } = useContext();

  return (
    <>
      <Layout>
        {error ? (
          <div>
            <h1 className="text-2xl font-bold">An occur has occured:</h1>
            <p className="text-center text-red-500">{error}</p>
          </div>
        ) : loading ? (
          <Loader />
        ) : (
          <>
            {!!printers.length ? (
              <div className="flex flex-1 justify-between">
                <div className="flex w-full self-center flex-col justify-center items-center gap-4">
                  <div>
                    <Select
                      options={printers}
                      extractor={(printer) => ({
                        label: printer,
                        value: printer,
                      })}
                      label={"Select a printer"}
                      handleChange={(item) => handleSelectPrinter(item.value)}
                      selected={selectedPrinter}
                    />
                  </div>
                  <div>
                    <Button
                      disabled={!selectedPrinter}
                      onClick={() => print(command)}
                    >
                      <PrintIcon />
                      <span>Print</span>
                    </Button>
                  </div>
                </div>
                <div>
                  <textarea
                    readOnly
                    value={command}
                    className="select-none border-2 p-3 border-gray-50 text-gray-400 resize-none outline-none w-96"
                    rows={15}
                  />
                </div>
              </div>
            ) : (
              <p className="text-gray-400">
                Printer not found. Please add a printer to your network to get
                started.
              </p>
            )}
          </>
        )}
      </Layout>
    </>
  );
};

export default HomePage;
