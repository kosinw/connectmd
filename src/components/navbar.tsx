import Brand from "vectors/brand.svg";
import BrandSmall from "vectors/brand-small.svg";
import Menu from "vectors/menu.svg";
import X from "vectors/x.svg";
import Link from "next/link";
import { Searchbar } from "components/searchbar";
import { useState } from "react";

interface NavbarProps {
  onNavToggle?: () => void;
  [x: string]: any;
}

export function Navbar({ onNavToggle, ...restProps }: NavbarProps) {
  function onNavClick() {
    setOpen((previous) => !previous);
    if (!!onNavToggle) {
      onNavToggle();
    }
  }

  const [open, setOpen] = useState(false);

  const hamburgerStyles = "fill-current w-5 h-5";

  const HamburgerMenu = !open ? (
    <Menu onClick={onNavClick} className={hamburgerStyles} />
  ) : (
    <X onClick={onNavClick} className={hamburgerStyles} />
  );

  return (
    <nav className="navbar">
      <div
        className="flex bg-white border-b border-gray-200 h-16 items-center"
        {...restProps}
      >
        <div className="w-full max-w-screen-xl mx-auto px-6">
          <div className="flex items-center -mx-6">
            <div className="lg:w-1/4 xl:w-1/5 lg:pr-8 px-8">
              <Link href="/">
                <a>
                  <Brand className="h-8 hover:text-blue-60 hidden md:block fill-current" />
                  <BrandSmall className="h-8 hover:text-blue-60 block md:hidden fill-current" />
                </a>
              </Link>
            </div>
            <div className="flex flex-grow items-center lg:w-3/4 xl:w-4/5 pr-6">
              <div className="w-full min-w-0 lg:px-3 xl:w-3/4">
                <Searchbar />
              </div>
              <div className="hidden lg:flex text-gray-700 lg:items-center lg:justify-between ml-6 xl:w-1/4">
                <a href="">Following</a>
                <a href="">Explore</a>
                <a href="">DM</a>
                <a href="">Q+A</a>
              </div>
              <button
                type="button"
                className="flex min-w-0 ml-6 items-center lg:hidden hover:text-gray-700 text-gray-500 focus:outline-none"
              >
                {HamburgerMenu}
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
