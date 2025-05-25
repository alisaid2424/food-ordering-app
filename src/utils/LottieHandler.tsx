"use client";

import Lottie from "lottie-react";
import notFound from "../assets/animation/notFound.json";
import empty from "../assets/animation/empty.json";
import error from "../assets/animation/error.json";

const lottieFilesmap = {
  notFound,
  empty,
  error,
};

interface LottieHandlerProps {
  type: keyof typeof lottieFilesmap;
  message?: string;
}

const LottieHandler = ({ type, message }: LottieHandlerProps) => {
  const messageStyle =
    type === "error"
      ? { color: "red", fontSize: "19px" }
      : { fontSize: "19px" };
  const lottie = lottieFilesmap[type];
  return (
    <div className="d-flex flex-column align-items-center justify-content-center ">
      <Lottie animationData={lottie} style={{ width: "400px" }} />
      {message && <h3 style={messageStyle}>{message}</h3>}
    </div>
  );
};

export default LottieHandler;
