import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Routes from "./routes/Routes";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./components/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
