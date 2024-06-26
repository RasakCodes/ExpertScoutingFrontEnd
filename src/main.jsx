import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./contexts/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        {/* <AutoLogout /> */}
        {/* <RouterProvider router={App} /> */}
        <App />
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);
