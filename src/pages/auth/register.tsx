import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";

import { RegisterForm } from "components/forms/register.form";

import BrandSmall from "vectors/brand-small.svg";
import LeftIcon from "vectors/left.icon.svg";

import styles from "styles/login.module.css";

import { useRouter } from "next/router";
import { redirectNoAuth } from "components/protect.route";

const RegisterPresentation: React.FC<{}> = ({}) => {
  const router = useRouter();

  return (
    <div className="w-full shadow overflow-y-auto">
      <div className="flex flex-col items-center w-full mx-auto md:px-8 lg:px-15 mt-8 mb-2 max-w-xs sm:max-w-sm md:max-w-full">
        <div className="w-full">
          <div className="min-w-0 float-left">
            <a
              onClick={(e) => router.back()}
              className="group flex flex-row space-x-2 items-center text-md leading-6 text-gray-900 font-bold focus:outline-none focus:underline cursor-pointer"
            >
              <LeftIcon className="group-hover:text-blue-600 h-4 w-auto fill-current" />
              <p className="group-hover:text-blue-600">Back</p>
            </a>
          </div>
        </div>
        <div className="w-full mt-9">
          <BrandSmall className="w-auto h-12 fill-current text-blue-600" />
        </div>
        <div className="flex flex-col w-full mt-6">
          <h1 className="text-3xl font-extrabold text-gray-900 leading-9">
            Create an account
          </h1>
          <p className="text-sm leading-5 mt-2 text-gray-600">
            Already have an account?&nbsp;
            <Link href="/auth/login">
              <a className="font-medium text-blue-600 hover:text-blue-500 focus:outline-none focus:underline">
                Sign in here.
              </a>
            </Link>
          </p>
        </div>
        <div className="mt-7 w-full">
          <RegisterForm />
        </div>
        <div className="mt-5 w-full">
          <p className="text-xs text-gray-500">
            By clicking "Sign up", you agree to our{" "}
            <Link href="/docs/legal">
              <a className="text-blue-600 hover:underline focus:text-blue-500">
                Terms of Service
              </a>
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

const RegisterPage: NextPage = ({}) => {
  return (
    <div className="h-screen bg-white w-full overflow-hidden">
      <div className="flex flex-row h-full w-full">
        <div
          className={`hidden md:flex md:w-7/12 lg:w-8/12 flex-shrink-0 ${styles.loginHero}`}
        ></div>
        <RegisterPresentation />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (typeof window === "undefined") {
    await redirectNoAuth(context, "/");
  }

  return { props: {} };
};

export default RegisterPage;
