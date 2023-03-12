import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Route, Redirect } from "react-router";

export default function RouterWapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  const { user } = useContext(UserContext);

  if (!user && isPrivate) {
    return <Redirect to='/' />;
  }

  if (user && isPrivate) {
    return <Redirect to='/dashboard' />;
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
