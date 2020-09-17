import React from "react";
import Home from "src/domain/Visitor/Home";
import SelectedGroup from "src/domain/AuthenticatedUser/SelectedGroup";
import Groups from "src/domain/AuthenticatedUser/Groups";
import Login from "src/domain/Visitor/Login/Login";
import CreateGroup from "src/domain/AuthenticatedUser/CreateGroup";

type Route = {
  component: React.FC;
  path?: string;
  exact?: boolean;
};

const visitorRoutes: Route[] = [
  { path: "/", component: Home, exact: true },
  { path: "/login", component: Login, exact: true },
];

const authenticatedRoutes: Route[] = [
  { path: "/", exact: true, component: Groups },
  { path: "/group/:groupId", exact: true, component: SelectedGroup },
  { path: "/create", exact: true, component: CreateGroup },
  // { path: "/group/:groupId/poll/:pollId", exact: true, component: Poll },
];

export { visitorRoutes, authenticatedRoutes };
