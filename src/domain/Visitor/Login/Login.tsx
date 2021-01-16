import React from "react";
import { Box } from "@chakra-ui/react";

const Login = () => {
  return (
    <Box>
      <nav>
        <ul>
          <li>
            <a href="http://localhost:3001/auth/google">Google Login</a>
          </li>
          <li>
            <a href="http://localhost:3001/auth/facebook">Facebook Login</a>
          </li>
        </ul>
      </nav>
    </Box>
  );
};

export default Login;
