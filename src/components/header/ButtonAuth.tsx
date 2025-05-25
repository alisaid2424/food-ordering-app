"use client";

import routes from "@/utils/routes";
import { Session } from "next-auth";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useAppDispatch } from "@/store/hook";
import { cleanUpCart } from "@/store/cart/cartSlice";

interface ButtonAuthProps {
  onSetToggle: React.Dispatch<React.SetStateAction<boolean>>;
  session: Session | null;
}

const ButtonAuth = ({ onSetToggle, session }: ButtonAuthProps) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    dispatch(cleanUpCart());

    signOut();
  };

  return (
    <>
      {session?.user ? (
        <div className="flex items-center gap-10">
          <button className="btnAuth" onClick={handleSignOut}>
            Sign Out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-5">
          <Link
            onClick={() => onSetToggle(false)}
            className={`${
              pathname.startsWith(routes.login) ? "text-red-500" : "text-black"
            } text-gray-500 font-semibold text-base hover:text-red-500`}
            href={routes.login}
          >
            Login
          </Link>
          <Link
            onClick={() => onSetToggle(false)}
            className="btnAuth"
            href={routes.register}
          >
            Register
          </Link>
        </div>
      )}
    </>
  );
};

export default ButtonAuth;
