import React from "react";
import { AuthProvider } from "../../domain/Auth/AuthProvider/Auth";
import { BrowserRouter } from "react-router-dom";

const AppProviders: React.FC = ({ children }) => {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
};

export default AppProviders;
