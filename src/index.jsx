import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, HashRouter} from "react-router";
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {DashboardApp} from "./DashboardApp";
import {Provider} from "react-redux";
import {store} from "./store";
import "./index.css";
const queryClient = new QueryClient()

const root = ReactDOM.createRoot( document.getElementById( "root" ) );
root.render(
  <BrowserRouter basename="/">
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <DashboardApp />
      </QueryClientProvider>
    </Provider>
  </BrowserRouter>
);