import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, HashRouter} from "react-router";
import {DashboardApp} from "./DashboardApp";
import {Provider} from "react-redux";
import {store} from "./store";
import "./index.css";


const root = ReactDOM.createRoot( document.getElementById( "root" ) );
root.render(
  <BrowserRouter basename="/">
    <Provider store={store}>
      <DashboardApp />
    </Provider>
  </BrowserRouter>
);