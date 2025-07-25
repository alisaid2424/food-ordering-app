import routes from "@/utils/routes";
import Image from "next/image";
import { FiArrowRightCircle } from "react-icons/fi";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const Hero = async () => {
  const t = await getTranslations("home.hero");

  return (
    <section className="section-gap">
      <div className="container grid grid-cols-1 md:grid-cols-2">
        <div className="md:py-12">
          <h1 className="text-2xl sm:text-4xl font-semibold">{t("title")}</h1>
          <p className="text-sm sm:text-base text-gray-500 leading-[1.7] my-4">
            {t("description")}
          </p>
          <div className="flex items-center gap-4">
            <Link
              href={routes.menu}
              className="flex gap-2 items-center uppercase py-1.5 sm:py-2 px-4 rounded-full bg-red-500 text-sm sm:text-base text-white"
            >
              {t("orderNow")}
              <FiArrowRightCircle fontSize={20} className="rtl:rotate-180" />
            </Link>
            <Link
              href={routes.about}
              className="flex gap-2 items-center text-black hover:text-red-500 duration-200 transition-colors font-semibold text-sm sm:text-base"
            >
              {t("learnMore")}
              <FiArrowRightCircle fontSize={20} className="rtl:rotate-180" />
            </Link>
          </div>
        </div>
        <div className="relative hidden md:block">
          <Image
            src="/pizza.png"
            alt="Pizza"
            fill
            className="object-contain"
            loading="eager"
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
