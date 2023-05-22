import AuthContext from "@app/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
import { BsFillBookmarksFill } from "react-icons/bs";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUserAlt,
  FaUserCircle,
  FaUserPlus,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

function Navbar() {
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { logout, isAuthenticated } = useContext(AuthContext);

  const handleScroll = () => {
    setIsUserMenuOpen(false);
  };

  useEffect(() => {
    if (isUserMenuOpen) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isUserMenuOpen]);

  return (
    <nav className="container mx-auto h-20 pt-8 mb-16">
      <div className="flex justify-between mx-5">
        <Link className="" href={"/"}>
          <Image
            priority
            src="/suggestLogo.png"
            alt="logo"
            width={100}
            height={100}
            sizes="10vw"
            className="w-full h-8"
          />
        </Link>
        <div className="lg:hidden">
          <div className="relative flex flex-col items-start select-none">
            <button onClick={() => setIsSidePanelOpen(true)}>
              <GiHamburgerMenu className="fill-lightBlue w-6 h-6" />
            </button>
            <div
              className={`fixed w-full h-full left-0 top-0 bg-gray bg-opacity-70 z-30 ${
                isSidePanelOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <div
                onClick={() => setIsSidePanelOpen(false)}
                className="absolute top-0 left-0 w-full h-full"
              />
            </div>
            <div
              className={`fixed top-0 right-0 h-full w-1/2 px-3 bg-darkBlue ease-in-out duration-300 z-50
             ${isSidePanelOpen ? "translate-x-0 " : "translate-x-full"}
            `}
            >
              <div className="flex flex-col select-none">
                <button
                  onClick={() => setIsSidePanelOpen(false)}
                  className="flex items-center fill-white self-end mt-6 mr-2 p-1"
                >
                  <IoMdClose className="w-8 h-8 fill-lightBlue" />
                </button>
                {isAuthenticated ? (
                  <ul
                    onClick={() => setIsSidePanelOpen(false)}
                    className="flex flex-col py-1 my-20 font-medium text-white text-xl"
                  >
                    <li className="rounded-md hover:bg-gray/30">
                      <Link
                        href={"/profile"}
                        className="h-20 px-4 w-full flex items-center space-x-2  hover:bg-sec/40"
                      >
                        <FaUserAlt className="w-6 h-6 fill-lightBlue" />
                        <span>My Profile</span>
                      </Link>
                    </li>
                    <li className="rounded-md hover:bg-gray/30">
                      <Link
                        href={"/bookmarks"}
                        className="h-20 px-4 w-full flex items-center space-x-2 hover:bg-sec/40"
                      >
                        <BsFillBookmarksFill className="w-6 h-6 fill-lightBlue" />
                        <span>Bookmarks</span>
                      </Link>
                    </li>
                    <li className="rounded-md hover:bg-gray/30">
                      <button
                        onClick={logout}
                        className="h-20 px-4 w-full flex items-center space-x-2 hover:bg-sec/40"
                      >
                        <FaSignOutAlt className="w-6 h-6 fill-lightBlue" />
                        <span className="text-last">Sign Out</span>
                      </button>
                    </li>
                  </ul>
                ) : (
                  <ul
                    onClick={() => setIsSidePanelOpen(false)}
                    className="flex flex-col py-1 my-20 font-medium text-white text-xl"
                  >
                    <li className="rounded-md hover:bg-gray/30">
                      <Link
                        href={"/signup"}
                        className="h-20 px-4 w-full flex items-center space-x-2  hover:bg-sec/40"
                      >
                        <FaUserPlus className="w-6 h-6 fill-lightBlue" />
                        <span>Sign Up</span>
                      </Link>
                    </li>
                    <li className="rounded-md hover:bg-gray/30">
                      <Link
                        href={"/signin"}
                        className="h-20 px-4 w-full flex items-center space-x-2 hover:bg-sec/40"
                      >
                        <FaSignInAlt className="w-6 h-6 fill-lightBlue" />
                        <span>Sign In</span>
                      </Link>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
        {isAuthenticated ? (
          <div className="hidden lg:flex space-x-8">
            <Link
              href={"/bookmarks"}
              className="h-8 text-white font-medium flex justify-center items-center space-x-1 hover:text-lightBlue"
            >
              <BsFillBookmarksFill className="w-5 h-5 " />

              <span>Bookmarks</span>
            </Link>
            <div className="relative flex flex-col">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="h-8 w-8 rounded-3xl bg-gray text-black font-medium flex justify-center items-center hover:bg-gray/90 "
              >
                <FaUserCircle className="w-6 h-6 fill-darkBlue" />
              </button>
              {isUserMenuOpen && (
                <div className="fixed top-[70px] ">
                  <ul
                    onClick={() => setIsUserMenuOpen(false)}
                    className="flex flex-col bg-gray backdrop-blur-md drop-shadow-xl rounded-lg font-medium text-darkBlue shadow-md "
                  >
                    <li className="hover:bg-darkBlue/20">
                      <Link
                        href={"/profile"}
                        className="h-10 px-4 w-full flex items-center space-x-2 hover:bg-sec/40"
                      >
                        <FaUserAlt className="w-5 h-5" />
                        <span>My Profile</span>
                      </Link>
                    </li>
                    <li className="hover:bg-darkBlue/20">
                      <button
                        onClick={logout}
                        className="h-10 px-4 w-full flex items-center space-x-2 hover:bg-sec/40"
                      >
                        <FaSignOutAlt className="w-5 h-5" />
                        <span className="text-last">Sign Out</span>
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="hidden lg:flex space-x-2">
            <Link
              href={"/signup"}
              className="h-8 w-28 rounded-3xl bg-white text-black font-medium flex justify-center items-center"
            >
              Sign Up
            </Link>
            <Link
              href={"/signin"}
              className="h-8 w-28 rounded-3xl bg-lightBlue text-black font-medium flex justify-center items-center"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
