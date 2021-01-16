import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";

import { AuthProvider } from "../../domain/Auth/AuthProvider/Auth";
import customTheme from "src/config/theme";
import NavigationBar from "../NavigationBar";

/**
 * Used to register global Providers across
 * the application.
 */
const AppProviders: React.FC = ({ children }) => {
  return (
    <BrowserRouter>
      <ChakraProvider theme={customTheme}>
        <AuthProvider>
          <NavigationBar />
          {children}
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
