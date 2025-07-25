import routes from "@/utils/routes";
import NavBar from "./NavBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const Header = async () => {
  const trans = await getTranslations();
  const session = await getServerSession(authOptions);

  return (
    <header className="flex items-center h-16 shadow-bottom-md relative z-30 bg-white bg-opacity-85">
      <div className="container flex items-center justify-between gap-7 w-full">
        <Link
          href={routes.home}
          className="text-red-600 font-semibold text-2xl"
        >
          🍕 {trans("logo")}
        </Link>

        <NavBar session={session} />
      </div>
    </header>
  );
};

export default Header;
