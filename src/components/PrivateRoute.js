import React, { useEffect, useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import TokenService from "../services/token-service";
import UserContext from "../context/UserContext";

export default function PrivateRoute({ component, ...props }) {
  

  const userCtx = useContext(UserContext);
  const Component = component;

  useEffect(() => {
    // read the auth token to set the user in context
    const user = TokenService.readJwtToken();
    // use a conditional here to prevent an infinite loop
    if (userCtx.user.user_id !== user.user_id) {
      userCtx.setUser(user);
    }
  }, [userCtx]);
  
  return (
    <Route
      {...props}
      render={componentProps => (
        TokenService.hasAuthToken()
          ? <Component {...componentProps} {...props} />
          : <Redirect
              to={{
                pathname: '/login',
                state: { from: componentProps.location }
              }}
            />
      )}
    />
  )
}