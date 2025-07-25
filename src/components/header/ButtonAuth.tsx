"use client";

import routes from "@/utils/routes";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useAppDispatch } from "@/store/hook";
import { cleanUpCart } from "@/store/cart/cartSlice";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

interface ButtonAuthProps {
  onSetToggle: React.Dispatch<React.SetStateAction<boolean>>;
  session: Session | null;
}

const ButtonAuth = ({ onSetToggle, session }: ButtonAuthProps) => {
  const trans = useTranslations("navbar");
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(cleanUpCart());

    signOut();
  };

  return (
    <>
      {session?.user ? (
        <button className="btnAuth" onClick={handleSignOut}>
          {trans("signOut")}
        </button>
      ) : (
        <div className="flex items-center gap-7 ">
          <Link
            onClick={() => onSetToggle(false)}
            className={`${
              pathname.startsWith(routes.login) ? "text-red-500" : "text-black"
            } text-gray-500 font-semibold text-base hover:text-red-500`}
            href={routes.login}
          >
            {trans("login")}
          </Link>
          <Link
            onClick={() => onSetToggle(false)}
            className="btnAuth"
            href={routes.register}
          >
            {trans("register")}
          </Link>
        </div>
      )}
    </>
  );
};

export default ButtonAuth;
