import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthUserProvider } from "./Contexts/AuthUserContext";
import { AllUsersProvider } from "./Contexts/AllUsersContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AllUsersProvider>
      <AuthUserProvider>
        <App />
      </AuthUserProvider>
    </AllUsersProvider>
  </React.StrictMode>
);
