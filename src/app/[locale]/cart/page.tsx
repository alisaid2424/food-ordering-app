import { getTranslations } from "next-intl/server";
import CartItems from "./_components/CartItems";

const CartPage = async () => {
  const t = await getTranslations("cart");

  return (
    <main>
      <section className="section-gap">
        <div className="container">
          <h1 className="text-red-500 text-center font-bold text-4xl italic mb-10">
            {t("title")}
          </h1>

          <CartItems emptyMessage={t("noItemsInCart")} />
        </div>
      </section>
    </main>
  );
};

export default CartPage;
