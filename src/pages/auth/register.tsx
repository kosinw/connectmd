import { NextPage } from "next";
import Link from "next/link";

import { RegisterForm } from "components/register.form";

import BrandSmall from "vectors/brand-small.svg";
import LeftIcon from "vectors/left.icon.svg";

import styles from "styles/register.module.css";
import { NoAuthRoute } from "components/protect.route";

const RegisterPresentation: React.FC<{}> = ({}) => {
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
      </div>
    </div>
  );
};

const RegisterPage: NextPage = ({}) => {
  return (
    <div className="h-screen bg-white w-full overflow-hidden">
      <div className="flex flex-row h-full w-full">
        <div
          className={`hidden md:flex md:w-7/12 lg:w-8/12 flex-shrink-0 ${styles.registerHero}`}
        ></div>
        <RegisterPresentation />
      </div>
    </div>
  );
};

export default NoAuthRoute(RegisterPage);
