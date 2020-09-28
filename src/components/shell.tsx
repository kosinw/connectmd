import Link from "next/link";
import { Transition } from "@tailwindui/react";

import styles from "styles/shell.module.css";

import Brand from "vectors/brand.svg";
import HomeIcon from "vectors/home.icon.svg";
import CloseIcon from "vectors/close.icon.svg";
import UserGroupIcon from "vectors/user-group.icon.svg";
import QuestionsIcon from "vectors/questions.icon.svg";
import SettingsIcon from "vectors/settings.icon.svg";
import PrivacyIcon from "vectors/privacy.icon.svg";
import HelpIcon from "vectors/help.icon.svg";
import SearchIcon from "vectors/search.icon.svg";
import PlusIcon from "vectors/plus.icon.svg";
import DMIcon from "vectors/dm.icon.svg";
import LoginIcon from "vectors/login.icon.svg";
import LogoutIcon from "vectors/logout.icon.svg";
import MenuIcon from "vectors/menu.icon.svg";

import { useAuth } from "hooks/firebase";
import { useToast } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useEventListener } from "hooks/event";

interface ShellProps {
  children: JSX.Element;
}

interface NavigationLinkProps {
  children: JSX.Element;
  url: string;
  title: string;
}

type MobileMenuActivateFunction = (
  e: React.MouseEvent<HTMLButtonElement>
) => void;

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
        <a className="group flex flex-row items-center space-x-4 focus:outline-none focus:text-gray-400">
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

export const ShellHeader: React.FC<{
  activateMobileMenu: MobileMenuActivateFunction;
}> = ({ activateMobileMenu: toggleMobileMenu }) => {
  const searchRef = useRef<HTMLInputElement>(null);

  function handleKeyDown(e: KeyboardEvent) {
    if (document.activeElement !== searchRef.current && e.key === "/") {
      e.preventDefault();
      searchRef.current.focus();
    }
  }

  useEventListener("keydown", handleKeyDown);

  const { user, logout } = useAuth();
  const toast = useToast();

  const handleLogoutClicked = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!!user) {
      e.preventDefault();
      try {
        await logout();

        toast({
          title: "Sign out successful!",
          description: "You have signed out of your account.",
          status: "success",
          duration: 4000,
          isClosable: true,
        });
      } catch (ex) {
        toast({
          title: "Sign out unsuccessful!",
          description: ex.message,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
    }
  };

  type AuthButtonProps = {
    title: string;
    children: React.ReactElement;
    [x: string]: any;
  };

  const AuthButton: React.FC<AuthButtonProps> = ({
    title,
    children,
    ...restProps
  }) => {
    return (
      <button
        {...restProps}
        className="text-gray-500 hover:text-blue-500 duration-150 transition-colors ease-in-out focus:outline-none focus:text-gray-400"
      >
        {children}
      </button>
    );
  };

  return (
    <header className="bg-white border-gray-200 border-b-2 shadow-sm">
      <div className="flex flex-row w-full divide-gray-300 divide-solid divide-x md:divide-x-0">
        <button
          onClick={toggleMobileMenu}
          className="h-full flex md:hidden items-center justify-center p-5 text-gray-500 focus:outline-none hover:text-gray-900 focus:bg-gray-100"
        >
          <MenuIcon className="h-6 w-auto stroke-current" />
        </button>
        <div className="flex px-5 py-5 space-x-4 w-full">
          <SearchIcon className="w-5 h-5 stroke-current text-gray-400" />
          <form className="w-full" onSubmit={(e) => e.preventDefault()}>
            <input
              ref={searchRef}
              className="focus:outline-none w-full text-gray-700 pr-4"
              type="text"
              placeholder="Search"
            />
          </form>
          <div className="flex flex-row justify-end items-center w-1/5 space-x-7">
            {!!user && (
              <div className="flex-shrink-0 flex flex-row items-center">
                <button className="text-gray-500 hover:text-blue-500 duration-150 transition-colors ease-in-out focus:outline-none focus:text-gray-400">
                  <PlusIcon className="w-6 h-6 stroke-current" />
                </button>
              </div>
            )}
            <div className="flex-shrink-0 flex flex-row items-center">
              {!!user ? (
                <AuthButton onClick={handleLogoutClicked} title="Sign out">
                  <LogoutIcon className="w-6 h-6 stroke-current" />
                </AuthButton>
              ) : (
                <Link href="/auth/login">
                  <AuthButton title="Sign in">
                    <div className="flex flex-row space-x-2">
                      <LoginIcon className="w-6 h-6 stroke-current" />
                      <p>Sign in</p>
                    </div>
                  </AuthButton>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export const ShellNavigation: React.FC<{}> = ({}) => {
  return (
    <nav className="bg-white border-gray-200 border-2 h-full">
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
            <NavigationLink url="/questions" title="Questions &amp; Answers">
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
  );
};

export const ShellMobileNavigation: React.FC<{
  mobileOpen: boolean;
  setMobileOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ mobileOpen, setMobileOpen }) => {
  return (
    <Transition show={mobileOpen} className="absolute inset-0 z-40 flex">
      {/* Off-canvas menu overlay, show/hide based on off-canvas menu state. */}
      <Transition.Child
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {(ref) => (
          <div ref={ref} className="absolute inset-0">
            <div
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 opacity-75 bg-cool-gray-600"
            />
          </div>
        )}
      </Transition.Child>
      <Transition.Child
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
        className="relative flex flex-col flex-1 w-full max-w-xs"
      >
        <div className="absolute top-0 right-0 p-1 -mr-14">
          <Transition.Child
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="flex items-center justify-center w-12 h-12  rounded-full focus:outline-none focus:bg-cool-gray-600"
            aria-label="Close sidebar"
            as="button"
            onClick={() => setMobileOpen(false)}
          >
            <CloseIcon className="w-8 h-8 text-white stroke-current" />
          </Transition.Child>
        </div>
        <ShellNavigation />
      </Transition.Child>
      <div className="flex-shrink-0 w-14">
        {/* Dummy element to force sidebar to shrink to fit close icon */}
      </div>
    </Transition>
  );
};

export const Shell: React.FC<ShellProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  useEventListener("keyup", (e: KeyboardEvent) => {
    if (!mobileOpen) return;

    if (e.key === "Escape") {
      setMobileOpen(false);
    }
  });

  const handleActivateMobileMenu: MobileMenuActivateFunction = (e) =>
    setMobileOpen(true);

  return (
    <>
      <div className="bg-gray-100">
        <div className="h-screen relative flex flex-row overflow-hidden">
          <div className="md:block hidden h-full md:w-1/3 xl:w-1/4 overflow-y-auto">
            <ShellNavigation />
          </div>
          <div className="block md:hidden h-full">
            <ShellMobileNavigation
              mobileOpen={mobileOpen}
              setMobileOpen={setMobileOpen}
            />
          </div>
          <div className="overflow-y-auto w-full">
            <div className="flex flex-col">
              <ShellHeader activateMobileMenu={handleActivateMobileMenu} />
              <main className="w-full">{children}</main>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
