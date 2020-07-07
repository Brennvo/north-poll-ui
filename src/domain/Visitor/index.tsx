import React from "react";
import { Switch, Route } from "react-router";
import { visitorRoutes } from "src/config/routes";

const Visitor = () => {
  return (
    <>
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
      <h1>Visitor Application</h1>

      <Switch>
        {visitorRoutes.map(({ path, component }) => (
          <Route exact path={path} component={component} />
        ))}
      </Switch>
    </>
  );
};

export default Visitor;
