import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { LocationProvider } from "./context/LocationContext";
import { AppRoutes } from "./routes/AppRoutes";

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <LocationProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </LocationProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
