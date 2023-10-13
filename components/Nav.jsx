"use client";

import Link from "next/link";
import Image from "next/image";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const iseUserLoggedIn = true;

  const [toggleDropdown, setToggleDropdown] = useState(false);

  /* Sign in using Google/Next-Auth */
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const requestProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    requestProviders();
  }, []);

  /* Markup */
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="promptopia logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop Navigation */}
      <div className="sm:flex hidden">
        {iseUserLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
                width={37}
                height={37}
                className="rounded-full cursor-pointer"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {/* Sign-In Button Using Next-Auth */}
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                ></button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}
      <div className="sm:hidden flex relative">
        {iseUserLoggedIn ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              className="rounded-full cursor-pointer"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)} // recommended alternative to (!toggleDropdown)
            />

            {toggleDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDropdown(false)}
                >
                  My Profile
                </Link>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Sign-In Button Using Next-Auth */}
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                  className="black_btn"
                ></button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
