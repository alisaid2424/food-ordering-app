import MainHeading from "./MainHeading";
import MenuSection from "./MenuSection";
import { getBestSellers } from "@/server/db/products";
import { getTranslations } from "next-intl/server";

const BestSellers = async () => {
  const t = await getTranslations("home.bestSeller");
  const bestSellers = await getBestSellers(4);

  return (
    <section>
      <div className="container">
        <div className="text-center mb-7">
          <MainHeading subTitle={t("checkOut")} title={t("OurBestSellers")} />
        </div>
        <MenuSection items={bestSellers} />
      </div>
    </section>
  );
};

export default BestSellers;
