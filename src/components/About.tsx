import routes from "@/utils/routes";
import MainHeading from "./MainHeading";
import { getTranslations } from "next-intl/server";

const About = async () => {
  const t = await getTranslations("home.about");

  return (
    <section className="section-gap" id={routes.about}>
      <div className="container text-center">
        <MainHeading subTitle={t("ourStory")} title={t("aboutUs")} />
        <div className="text-gray-600 max-w-md mx-auto mt-4 flex flex-col gap-4">
          <p>{t("descriptions.one")}</p>
          <p>{t("descriptions.two")}</p>
          <p>{t("descriptions.three")}</p>
        </div>
      </div>
    </section>
  );
};

export default About;
