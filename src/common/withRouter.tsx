import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const withRouter = <T extends object>(Component: React.ComponentType<T>) => {
  function ComponentWithRouterProp(props: Omit<T, 'router'>) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props as T} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
};
