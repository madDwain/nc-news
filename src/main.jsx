import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { LoginProvider } from "./contexts/login.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoginProvider >
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </LoginProvider>
);
