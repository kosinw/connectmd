import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";

import { LoginForm } from "components/login.form";

import BrandSmall from "vectors/brand-small.svg";
import LeftIcon from "vectors/left.icon.svg";
import GoogleIcon from "vectors/google.icon.svg";

import styles from "styles/login.module.css";
import { useAuth } from "hooks/firebase";
import { useToast } from "@chakra-ui/core";
import { useEffect } from "react";
import { NoAuthRoute } from "components/protect.route";

const LoginPresentation: React.FC<{}> = ({}) => {
  const { loginGoogle } = useAuth();
  const toast = useToast();

  const handleGoogleButton = async () => {
    try {
      await loginGoogle();
    } catch (ex) {
      if (ex.code !== "auth/popup-closed-by-user") {
        toast({
          title: "Sign in unsuccessful!",
          description: ex.message,
          duration: 4000,
          status: "error",
          isClosable: true,
        });
      }
    }
  };

  return (
    <div className="w-full shadow overflow-y-auto">
      <div className="flex flex-col items-center w-full mx-auto md:px-8 lg:px-15 my-9 max-w-xs sm:max-w-sm md:max-w-full">
        <div className="w-full">
          <Link href="/">
            <a className="group flex flex-row space-x-2 items-center text-md leading-6 text-gray-900 font-bold focus:outline-none focus:underline">
              <LeftIcon className="group-hover:text-blue-600 h-4 w-auto fill-current" />
              <p className="group-hover:text-blue-600">Back</p>
            </a>
          </Link>
        </div>
        <div className="w-full mt-9">
          <BrandSmall className="w-auto h-12 fill-current text-blue-600" />
        </div>
        <div className="flex flex-col w-full mt-6">
          <h1 className="text-3xl font-extrabold text-gray-900 leading-9">
            Sign in to your account
          </h1>
          <p className="text-sm leading-5 mt-2 text-gray-600">
            Don't have an account?&nbsp;
            <Link href="/auth/register">
              <a className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline">
                Create one here.
              </a>
            </Link>
          </p>
        </div>
        <div className="flex flex-col w-full mt-7">
          <p className="text-sm leading-5 font-bold text-gray-700">
            Sign in with
          </p>
          <div className="flex flex-row mt-2 justify-between items-start space-x-3">
            <button
              onClick={handleGoogleButton}
              className="group w-full py-2 border flex border-gray-400 rounded-md hover:bg-gray-400 transition-colors ease-in-out duration-150 text-gray-500 hover:text-white focus:outline-none focus:border-gray-300"
            >
              <GoogleIcon className="h-5 w-auto fill-current mx-auto" />
            </button>
          </div>
        </div>
        <div
          className={`${styles.divider} space-x-2 w-full text-gray-500 mt-7 text-md leading-5`}
        >
          Or continue with
        </div>
        <div className="mt-7 w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

const LoginPage: NextPage = ({}) => {
  return (
    <div className="h-screen bg-white w-full overflow-hidden">
      <div className="flex flex-row h-full w-full">
        <LoginPresentation />
        <div
          className={`hidden md:flex md:w-7/12 lg:w-8/12 flex-shrink-0 ${styles.loginHero}`}
        ></div>
      </div>
    </div>
  );
};

export default NoAuthRoute(LoginPage);
