import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { HostelProvider } from './contexts/HostelContext';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HostelProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </HostelProvider>
);