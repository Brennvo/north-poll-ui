import React from "react";
import { Switch, Route } from "react-router";
import { visitorRoutes } from "src/config/routes";

const Visitor = () => {
  return (
    <>
      <h1 style={{ margin: 0, padding: 0 }}>Visitor Application</h1>

      <Switch>
        {visitorRoutes.map(({ path, component }) => (
          <Route exact path={path} component={component} />
        ))}
      </Switch>
    </>
  );
};

export default Visitor;
