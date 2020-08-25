import React from "react";
import { useAuth } from "../Auth/AuthProvider/Auth";
import { Switch, Route } from "react-router";
import { authenticatedRoutes } from "src/config/routes";
import { GroupProvider } from "./GroupProvider/GroupProvider";
import NotFound from "../Auth/NotFound";
import { Link } from "react-router-dom";

const AuthenticatedRoutes = () => {
  const auth = useAuth();

  return (
    <>
      <p>Authenticated User {auth?.user!.username}</p>
      <Link to="/">Home</Link>
      <GroupProvider>
        <Switch>
          {authenticatedRoutes.map(({ path, component, exact }, i) => (
            <Route key={i} exact={exact} path={path} component={component} />
          ))}
          <Route component={NotFound} />
        </Switch>
      </GroupProvider>
    </>
  );
};

export default AuthenticatedRoutes;
