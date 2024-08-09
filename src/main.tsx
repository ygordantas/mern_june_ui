import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import ColorThemeProvider from "./contexts/colorThemeContext.tsx";
import UserProvider from "./contexts/userContext.tsx";
import router from "./navigation/router.tsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <ColorThemeProvider>
        <RouterProvider router={router} />
      </ColorThemeProvider>
    </UserProvider>
  </React.StrictMode>
);
