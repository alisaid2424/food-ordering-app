"use client";

import routes from "@/utils/routes";
import MainHeading from "./MainHeading";
import { useTranslations } from "next-intl";
import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect, useRef } from "react";

const About = () => {
  const t = useTranslations("home.about");
  const containerRef = useRef(null);

  const isInView = useInView(containerRef, { once: true });
  const mainControls = useAnimation();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const paragraphOneValue = useTransform(
    scrollYProgress,
    [0, 1],
    ["-100%", "0%"]
  );

  const paragraphTwoValue = useTransform(
    scrollYProgress,
    [0, 1],
    ["100%", "0%"]
  );

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <section className="section-gap" id={routes.about} ref={containerRef}>
      <div className="container text-center">
        <MainHeading subTitle={t("ourStory")} title={t("aboutUs")} />
        <div className="text-gray-600 max-w-md mx-auto mt-4 flex flex-col gap-5">
          <motion.p style={{ translateX: paragraphOneValue }}>
            {t("descriptions.one")}
          </motion.p>
          <motion.p style={{ translateX: paragraphTwoValue }}>
            {t("descriptions.two")}
          </motion.p>
          <motion.p style={{ translateX: paragraphOneValue }}>
            {t("descriptions.three")}
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default About;
