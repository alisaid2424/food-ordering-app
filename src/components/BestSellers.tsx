import MainHeading from "./MainHeading";
import MenuSection from "./MenuSection";
import { getBestSellers } from "@/server/db/products";

const BestSellers = async () => {
  const bestSellers = await getBestSellers(4);

  return (
    <section>
      <div className="container">
        <div className="text-center mb-7">
          <MainHeading subTitle="check out" title="Our Best Sellers" />
        </div>
        <MenuSection items={bestSellers} />
      </div>
    </section>
  );
};

export default BestSellers;
