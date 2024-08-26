import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { TasksContextProvider } from "./context/TaskContext";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <TasksContextProvider>
        <App />
      </TasksContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
