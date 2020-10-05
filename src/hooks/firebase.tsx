import firebase from "firebase/app";
import md5 from "md5";
import nookies from "nookies";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCdnrF_AkIQq_Y-pWTggjqsBMOH5RZPeF0",
  authDomain: "connectmd0.firebaseapp.com",
  databaseURL: "https://connectmd0.firebaseio.com",
  projectId: "connectmd0",
  storageBucket: "connectmd0.appspot.com",
  messagingSenderId: "118158370701",
  appId: "1:118158370701:web:12f83046ace9a38a60ffc4",
  measurementId: "G-JW8S4NPH18",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const providers = {
  google: new firebase.auth.GoogleAuthProvider(),
};

const AuthContext = createContext<useAuthOptions>({} as useAuthOptions);

export const useAuth = () => {
  return useContext(AuthContext);
};

type LoginFunction = (
  email: string,
  password: string,
  rememberMe?: boolean
) => Promise<firebase.User>;

type RegisterFunction = (
  email: string,
  password: string,
  displayName: string,
  rememberMe?: boolean
) => Promise<firebase.User>;

type LogoutFunction = () => Promise<void>;

type ThirdPartyFunction = () => Promise<void>;

interface useAuthOptions {
  user: firebase.User;
  isAuthenticated: boolean;
  login: LoginFunction;
  register: RegisterFunction;
  logout: LogoutFunction;
  loginGoogle: ThirdPartyFunction;
}

function useProvideAuth(): useAuthOptions {
  const [user, setUser] = useState<firebase.User>(null);
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      setUser(user);
      if (!!user) {
        const token = await user.getIdToken();
        nookies.set(undefined, "authToken", token, {
          maxAge: 30 * 24 * 60 * 60,
          path: "/",
        });
      } else {
        nookies.destroy(undefined, "authToken", {
          path: "/",
        });
      }
    });

    return () => unsubscribe();
  }, []);

  useMemo(() => {
    setAuthenticated(!!user);
  }, [user]);

  const login: LoginFunction = async (email, password, rememberMe) => {
    if (rememberMe) {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    } else {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION);
    }

    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    // setUser(response.user);

    return response.user;
  };

  const register: RegisterFunction = async (
    email,
    password,
    displayName,
    rememberMe
  ) => {
    if (rememberMe) {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION);
    } else {
      await firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL);
    }

    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    await response.user.updateProfile({
      photoURL: `https://www.gravatar.com/avatar/${md5(
        response.user.uid
      )}?d=identicon`,
      displayName,
    });

    // setUser(response.user);

    return response.user;
  };

  const logout: LogoutFunction = async () => {
    await firebase.auth().signOut();
    // setUser(null);
  };

  const loginGoogle: ThirdPartyFunction = async () => {
    const response = await firebase.auth().signInWithPopup(providers.google);

    // setUser(response.user);

    router.push("/");
  };

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    loginGoogle,
  };
}

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}
