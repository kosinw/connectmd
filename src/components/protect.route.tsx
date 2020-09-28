import { useAuth } from "hooks/firebase";
import { useRouter } from "next/router";
import { useEffect } from "react";

export const NoAuthRoute = (Component, ...rest) => {
  return () => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (isAuthenticated) router.replace("/");
    }, [isAuthenticated]);

    return <Component {...rest} />;
  };
};

export function ProtectRoute(Component, ...rest) {
  return () => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!!isAuthenticated) router.replace("/auth/login");
    }, [isAuthenticated]);

    return <Component {...rest} />;
  };
}
