import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import styles from "styles/shell.module.css";

import Brand from "vectors/brand.svg";
import HomeIcon from "vectors/home.icon.svg";
import UserGroupIcon from "vectors/user-group.icon.svg";
import QuestionsIcon from "vectors/questions.icon.svg";
import SettingsIcon from "vectors/settings.icon.svg";
import PrivacyIcon from "vectors/privacy.icon.svg";
import HelpIcon from "vectors/help.icon.svg";
import SearchIcon from "vectors/search.icon.svg";
import BellIcon from "vectors/bell.icon.svg";
import DMIcon from "vectors/dm.icon.svg";
import LoginIcon from "vectors/login.icon.svg";

interface ShellProps {
  children: JSX.Element;
}

interface NavigationLinkProps {
  children: JSX.Element;
  url: string;
  title: string;
}

const NavigationLink: React.FC<NavigationLinkProps> = ({
  children,
  url,
  title,
}) => {
  const router = useRouter();

  const currentClass =
    router.pathname === url ? styles.activeRoute : styles.inactiveRoute;

  return (
    <div className={`px-2 py-3 ${currentClass}`}>
      <Link href={url}>
        <a className="group flex flex-row items-center space-x-4">
          <div className="group-hover:text-blue-400 duration-150 transition-colors ease-in-out">
            {children}
          </div>
          <p className="text-sm font-medium group-hover:text-blue-600 duration-150 transition-colors ease-in-out">
            {title}
          </p>
        </a>
      </Link>
    </div>
  );
};

export const Shell: React.FC<ShellProps> = ({ children }) => {
  const searchRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    console.log(e.key);
    if (document.activeElement !== searchRef.current && e.key === "/") {
      e.preventDefault();
      searchRef.current.focus();
    }
  }

  return (
    <>
      <div onKeyDown={handleKeyDown} className="bg-gray-100">
        <div className="h-screen flex flex-row overflow-hidden">
          <nav className="bg-white h-full md:w-1/3 xl:w-1/4 hidden md:block border-gray-200 border-2 overflow-y-auto">
            <div className="flex flex-col py-5 px-4 space-y">
              <div className="flex-shrink-0">
                <Link href="/">
                  <a className="hover:text-blue-600">
                    <Brand className="h-9 fill-current" />
                  </a>
                </Link>
              </div>
              <div className="flex flex-col divide-solid divide-gray-200 divide-y">
                <div className="flex flex-col space-y-1 py-3">
                  <NavigationLink url="/" title="Home">
                    <HomeIcon className="w-6 h-6 stroke-current" />
                  </NavigationLink>
                  <NavigationLink url="/following" title="Following">
                    <UserGroupIcon className="w-6 h-6 stroke-current" />
                  </NavigationLink>
                  <NavigationLink
                    url="/questions"
                    title="Questions &amp; Answers"
                  >
                    <QuestionsIcon className="w-6 h-6 stroke-current" />
                  </NavigationLink>
                  <NavigationLink url="/messages" title="Direct Messages">
                    <DMIcon className="w-6 h-6 stroke-current" />
                  </NavigationLink>
                </div>
                <div className="flex flex-col space-y-1 py-3">
                  <NavigationLink url="/settings" title="Settings">
                    <SettingsIcon className="w-6 h-6 stroke-current" />
                  </NavigationLink>
                  <NavigationLink url="/docs/help" title="Help">
                    <HelpIcon className="w-6 h-6 stroke-current" />
                  </NavigationLink>
                  <NavigationLink url="/docs/legal" title="Legal">
                    <PrivacyIcon className="w-6 h-6 stroke-current" />
                  </NavigationLink>
                </div>
              </div>
            </div>
          </nav>
          <main className="overflow-y-auto w-full">
            <div className="flex flex-col">
              <div className="bg-white border-gray-200 border-b-2 shadow-sm">
                <div className="flex px-5 py-5 space-x-4">
                  <SearchIcon className="w-5 h-5 stroke-current text-gray-400" />
                  <form className="w-3/4">
                    <input
                      ref={searchRef}
                      className="focus:outline-none w-full text-gray-700"
                      type="text"
                      placeholder="Search"
                    />
                  </form>
                  <div className="flex flex-row justify-end items-center w-1/5 space-x-7">
                    <div className="flex-shrink-0 flex flex-row items-center">
                      <button className="text-gray-500 hover:text-blue-500 duration-150 transition-colors ease-in-out">
                        <BellIcon className="w-6 h-6 stroke-current" />
                      </button>
                    </div>
                    <div className="flex-shrink-0 flex flex-row items-center">
                      <Link href="/auth/login">
                        <button className="text-gray-500 hover:text-blue-500 duration-150 transition-colors ease-in-out">
                          <LoginIcon className="w-6 h-6 stroke-current" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};
