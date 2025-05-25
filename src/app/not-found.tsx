import LottieHandler from "@/utils/LottieHandler";
import routes from "@/utils/routes";
import Link from "next/link";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";

const NotFoundPage = () => {
  return (
    <section className="absolute inset-0 flex items-center justify-center flex-col">
      <LottieHandler
        type="notFound"
        message="Page Not Found. Please check the URL and try again."
      />

      <Link
        href={routes.home}
        className="flex items-center gap-2  bg-red-500 text-white text-base rounded-full w-fit py-2 px-3 mt-10"
      >
        <HiOutlineArrowCircleLeft className="text-xl" /> Back to Home
      </Link>
    </section>
  );
};

export default NotFoundPage;
