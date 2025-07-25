import routes from "@/utils/routes";
import MainHeading from "./MainHeading";
import { getTranslations } from "next-intl/server";

const Contact = async () => {
  const t = await getTranslations("home.contact");

  return (
    <section className="section-gap" id={routes.contact}>
      <div className="container text-center">
        <MainHeading subTitle={t("Don'tHesitate")} title={t("contactUs")} />
        <div className="mt-8">
          <a
            className="text-2xl underline text-gray-600 block mb-5"
            href="tel:+2012121212"
          >
            +2012121212
          </a>
          <a
            className="text-2xl underline text-gray-600"
            href="tel:+2013151315"
          >
            +2013151315
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
