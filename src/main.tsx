/* eslint-disable @typescript-eslint/ban-ts-comment */
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import * as rootRoute from "./App.tsx";
import React from "react";

const router = createBrowserRouter(
  [
    {
      ...rootRoute,
      id: "root",
      path: "/",
      element: <App />,
    },
  ],
  {
    async unstable_patchRoutesOnMiss({ path, patch }) {
      if (path.startsWith("/remote")) {
        // @ts-ignore
        const routes = await import("remote/routes");
        patch("root", routes.default.routes);
      }
    },
  }
);

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
