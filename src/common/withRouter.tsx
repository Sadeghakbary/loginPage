import { useLocation, useNavigate, useParams } from "react-router-dom";

export const withRouter = <T extends object>(Component: React.ComponentType<T>) => {
  function ComponentWithRouterProp(props: Omit<T, 'router'>) {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return <Component {...props as T} router={{ location, navigate, params }} />;
  }
  return ComponentWithRouterProp;
};
