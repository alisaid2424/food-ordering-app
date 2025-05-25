"use client";

import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import LottieHandler from "@/utils/LottieHandler";
import routes from "@/utils/routes";
import Link from "next/link";

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

const ErrorPage = ({ error, reset }: ErrorPageProps) => {
  return (
    <div className="flex flex-col justify-center items-center  min-h-[calc(100vh-114px)] mx-auto text-center w-2/4 md:w-1/4">
      <LottieHandler type="error" message={error.message} />

      <button
        onClick={reset}
        className="text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 py-2 px-4 rounded-full mt-7"
      >
        Try Again
      </button>

      <Link
        href={routes.home}
        className="flex items-center gap-2 bg-red-500 text-white text-base rounded-full w-fit py-2 px-3 mt-7 mb-10"
      >
        <HiOutlineArrowCircleLeft className="text-xl" /> Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
