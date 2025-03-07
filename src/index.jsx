import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, HashRouter} from "react-router";
import {DashboardApp} from "./DashboardApp";
import "./index.css";
import {AuthProvider} from "./auth/authContext";

const root = ReactDOM.createRoot( document.getElementById( "root" ) );
root.render(
  <BrowserRouter>
    <AuthProvider>
      <DashboardApp />
    </AuthProvider>
  </BrowserRouter>
);