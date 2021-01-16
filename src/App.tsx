import React from "react";

import { useAuth } from "./domain/Auth/AuthProvider/Auth";
import { Box } from "@chakra-ui/react";

import AuthenticatedUser from "./domain/AuthenticatedUser";
import Visitor from "./domain/Visitor";
import LayoutWrapper from "./components/LayoutWrapper";

function App() {
  const auth = useAuth();

  return (
    <LayoutWrapper>
      <Box as="main" h="100vh" pt={10}>
        {auth?.isAuthenticated ? <AuthenticatedUser /> : <Visitor />}
      </Box>
    </LayoutWrapper>
  );
}

export default App;
