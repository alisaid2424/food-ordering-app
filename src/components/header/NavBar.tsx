"use client";

import routes from "@/utils/routes";
import Link from "next/link";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import ButtonCart from "./ButtonCart";
import ButtonAuth from "./ButtonAuth";
import { Session } from "next-auth";
import { UserRole } from "@prisma/client";
import { usePathname } from "next/navigation";

interface NavBarProps {
  session: Session | null;
}

const NavBar = ({ session }: NavBarProps) => {
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();

  const links = [
    {
      id: crypto.randomUUID(),
      title: "Home",
      href: routes.home,
    },
    {
      id: crypto.randomUUID(),
      title: "Menu",
      href: routes.menu,
    },
    {
      id: crypto.randomUUID(),
      title: "About",
      href: routes.about,
    },
    {
      id: crypto.randomUUID(),
      title: "Contact",
      href: routes.contact,
    },
  ];

  const isAdmin = session?.user.role === UserRole.ADMIN;

  return (
    <>
      {/* moved to the right side, next to cart */}
      <div className="flex items-center md:hidden gap-7">
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
        className="navLinksWraper p-10 md:p-0 flex flex-col md:flex-row items-start md:items-center  md:justify-between md:basis-2/3"
        style={{
          clipPath: toggle ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : "",
        }}
      >
        <ul className="navLinks relative z-50 flex items-start md:items-center flex-col md:flex-row  pb-3 md:pb-0 gap-3 lg:gap-10 ">
          {links.map((link) => (
            <li key={link.id}>
              <Link
                onClick={() => setToggle(false)}
                href={link.href}
                className={`${
                  pathname === link.href ? "text-red-500" : "text-black"
                }`}
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
                {isAdmin ? "Admin" : "Profile"}
              </Link>
            </li>
          )}
        </ul>

        {/* Auth buttons */}
        <ButtonAuth onSetToggle={setToggle} session={session} />
      </div>

      {/* Cart for desktop */}
      <div className="hidden md:block ml-7">
        <ButtonCart />
      </div>
    </>
  );
};

export default NavBar;
