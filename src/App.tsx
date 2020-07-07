import React from "react";

import { useAuth } from "./domain/Auth/AuthProvider/Auth";
import User from "./domain/User";
import Visitor from "./domain/Visitor";

function App() {
  const auth = useAuth();

  return auth?.isAuthenticated ? <User /> : <Visitor />;
}

export default App;
