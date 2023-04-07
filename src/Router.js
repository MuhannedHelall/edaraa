import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainPage from "./shared/MainPage";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Supervisors from "./pages/Admin/Supervisors";
import Warehouses from "./pages/Admin/Warehouses";
import Requests from "./pages/Admin/Requests";
import WarehouseProductItem from "./pages/ProductsPage";
import NotFound from "./shared/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/",
        element: <MainPage />,
        children: [
          {
            path: "/dashboard",
            element: <Dashboard />,
          },
          {
            path: "/supervisors",
            element: <Supervisors />,
          },
          {
            path: "/warehouses",
            element: <Warehouses />,
          },
          {
            path: "/warehouses/:id",
            element: <WarehouseProductItem />,
          },
          {
            path: "/requests",
            element: <Requests />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
]);
