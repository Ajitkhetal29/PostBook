import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import PostBookContextProvider from "./context/PostBookContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <PostBookContextProvider>
      <App />
    </PostBookContextProvider>
  </BrowserRouter>
);
