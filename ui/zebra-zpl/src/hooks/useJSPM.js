import { useCallback, useEffect, useState } from "react";

import {
  JSPrintManager,
  ClientPrintJob,
  InstalledPrinter,
  WSStatus,
} from "jsprintmanager";

JSPrintManager.license_url = import.meta.env.VITE_APP_LICENSE_URL;
JSPrintManager.auto_reconnect = true;

export const STATUS = {
  BLOCKED: "blocked",
  OPEN: "open",
  CLOSED: "closed",
  NO_RESPONSE: "no response",
};

const MAP_STATUS = {
  [WSStatus.Blocked]: STATUS.BLOCKED,
  [WSStatus.Open]: STATUS.OPEN,
  [WSStatus.Closed]: STATUS.CLOSED,
  [WSStatus.WaitingForUserResponse]: STATUS.NO_RESPONSE,
};

export default () => {
  const [loading, setLoading] = useState(true);
  const [printers, setPrinters] = useState([]);
  const [selectedPrinter, setSelectedPrinter] = useState(null);
  const [error, setError] = useState(null);
  const [canReload, setCanReload] = useState(true);
  const [status, setStatus] = useState(MAP_STATUS[WSStatus.Closed]);

  const loadJSPrintManager = async () => {
    setError(null);
    setLoading(true);
    JSPrintManager.start()
      .then(getPrinters)
      .catch((err) => setError(JSON.stringify(err)))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadJSPrintManager();
  }, []);

  const handleSelectPrinter = (p) => {
    setSelectedPrinter(p);
  };

  const reload = () => {
    if (!canReload) return;
    loadJSPrintManager();
    setCanReload(false);
    setTimeout(() => {
      setCanReload(true);
    }, 2000);
  };

  const updateStatus = async () => {
    setStatus(MAP_STATUS[JSPrintManager.websocket_status]);
    if (JSPrintManager.websocket_status == WSStatus.Closed) {
      setError(
        "JSPrintManager (JSPM) is not installed or not running! Download JSPM Client App from https://neodynamic.com/downloads/jspm"
      );
      return;
    }
    if (JSPrintManager.websocket_status == WSStatus.Blocked) {
      setError("JSPM has blocked this website!");
    }
  };

  const getPrinters = async () => {
    await JSPrintManager.getPrinters().then(setPrinters);
  };

  const print = async (commands) => {
    if (!selectedPrinter) return;
    const job = new ClientPrintJob();
    job.clientPrinter = new InstalledPrinter(selectedPrinter);
    job.printerCommands = commands;
    try {
      await job.sendToClient();
    } catch (err) {
      console.error(err);
      setError(
        err?.message || "something went wrong while creating a print job!"
      );
    }
  };

  useEffect(() => {
    JSPrintManager.WS.onStatusChanged = updateStatus;
  }, []);

  return {
    printers,
    error,
    status,
    print,
    handleSelectPrinter,
    selectedPrinter,
    loading,
    reload,
  };
};
