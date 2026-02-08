import { useEffect } from "react";
import { withRouter } from "./withRouter";

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

interface AuthVerifyProps {
  router: {
    location: Location;
  };
  logOut: () => void;
}

const AuthVerify = (props: AuthVerifyProps) => {
  const { location } = props.router;

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    if (user) {
      const decodedJwt = parseJwt(user.accessToken);

      if (decodedJwt && decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  }, [location]);

  return <div></div>;
};

export default withRouter(AuthVerify);
