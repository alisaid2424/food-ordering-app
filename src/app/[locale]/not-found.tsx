import { Link } from "@/i18n/navigation";
import LottieHandler from "@/utils/LottieHandler";
import routes from "@/utils/routes";

import { HiOutlineArrowCircleLeft } from "react-icons/hi";

const NotFoundPage = () => {
  return (
    <section className="flex items-center justify-center flex-col min-h-[calc(100vh-64px)] px-4">
      <div className="w-full max-w-md">
        <LottieHandler
          type="notFound"
          message="Page Not Found. Please check the URL and try again."
        />
      </div>

      <Link
        href={routes.home}
        className="flex items-center gap-2  bg-red-500 text-white text-base rounded-full w-fit py-2 px-3 mt-10"
      >
        <HiOutlineArrowCircleLeft className="text-xl rtl:rotate-180" /> Back to
        Home
      </Link>
    </section>
  );
};

export default NotFoundPage;
