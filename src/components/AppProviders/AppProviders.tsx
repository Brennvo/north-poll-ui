import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import { AuthProvider } from "../../domain/Auth/AuthProvider/Auth";
import customTheme from "src/config/theme";
import NavigationBar from "../NavigationBar";

const AppProviders: React.FC = ({ children }) => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider theme={customTheme}>
          <CSSReset />
          <NavigationBar />
          {children}
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
