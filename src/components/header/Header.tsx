import routes from "@/utils/routes";
import Link from "next/link";
import NavBar from "./NavBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

const Header = async () => {
  const session = await getServerSession(authOptions);

  return (
    <header className="flex items-center h-16 shadow-bottom-md relative z-30 bg-white bg-opacity-85">
      <div className="container flex items-center justify-between w-full">
        <Link
          href={routes.home}
          className="text-red-600 font-semibold text-2xl md:basis-1/3"
        >
          🍕 Pizza
        </Link>

        <NavBar session={session} />
      </div>
    </header>
  );
};

export default Header;
