"use client";

import routes from "@/utils/routes";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import ButtonCart from "./ButtonCart";
import ButtonAuth from "./ButtonAuth";
import { Session } from "next-auth";
import { UserRole } from "@prisma/client";
import BtnChangeLanguage from "./BtnChangeLanguage";
import {  useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

interface NavBarProps {
  session: Session | null;
}

const NavBar = ({ session }: NavBarProps) => {
  const trans = useTranslations("navbar");
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();

  const links = [
    {
      id: crypto.randomUUID(),
      title: trans("home"),
      href: routes.home,
    },
    {
      id: crypto.randomUUID(),
      title: trans("menu"),
      href: routes.menu,
    },
    {
      id: crypto.randomUUID(),
      title: trans("about"),
      href: routes.about,
    },
    {
      id: crypto.randomUUID(),
      title: trans("contact"),
      href: routes.contact,
    },
  ];

  const isAdmin = session?.user.role === UserRole.ADMIN;

  const isLinkActive = (href: string) => {
    return href === "/" ? pathname === "/" : pathname === href;
  };

  return (
    <>
      {/* moved to the right side, next to cart */}
      <div className="flex items-center gap-7 md:hidden ">
        <BtnChangeLanguage />

        <ButtonCart />

        <div className="text-4xl cursor-pointer text-slate-800">
          {toggle ? (
            <IoCloseSharp onClick={() => setToggle((prev) => !prev)} />
          ) : (
            <IoMenu onClick={() => setToggle((prev) => !prev)} />
          )}
        </div>
      </div>

      {/* Navigation links */}
      <div
        className="navLinksWraper py-10 px-10 sm:px-16 md:px-0 md:py-0 flex flex-col md:flex-row items-start md:items-center  md:justify-between md:flex-1"
        style={{
          clipPath: toggle ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "",
        }}
      >
        <ul className="navLinks relative z-50 flex items-start md:items-center flex-col md:flex-row  pb-3 md:pb-0 gap-4 lg:gap-8">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                onClick={() => setToggle(false)}
                href={link.href}
                className={`${
                  isLinkActive(link.href) ? "text-red-500" : "text-black"
                } hover:text-red-500 duration-200 transition-colors font-semibold`}
              >
                {link.title}
              </Link>
            </li>
          ))}
          {session?.user && (
            <li>
              <Link
                href={isAdmin ? routes.admin : routes.profile}
                onClick={() => setToggle(false)}
                className={`${
                  pathname.startsWith(routes.admin) ||
                  pathname.startsWith(routes.profile)
                    ? "text-red-500"
                    : "text-black"
                } hover:text-red-500 duration-200 transition-colors font-semibold`}
              >
                {isAdmin ? trans("admin") : trans("profile")}
              </Link>
            </li>
          )}
        </ul>

        {/* Auth buttons */}
        <ButtonAuth onSetToggle={setToggle} session={session} />
      </div>

      {/* Cart for desktop */}
      <div className="hidden md:flex md:items-center gap-5 lg:gap-7">
        {/* Btn Change languages */}
        <BtnChangeLanguage />

        <ButtonCart />
      </div>
    </>
  );
};

export default NavBar;
