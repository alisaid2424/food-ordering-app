import routes from "@/utils/routes";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import AddProductForm from "./AddProductForm";
import { getCategories } from "@/server/db/categories";
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

const AddProductPage = async () => {
  const categories = await getCategories();
  const t = await getTranslations("admin.menu-items");

  if (!categories || categories.length === 0) {
    redirect(`${routes.categories}/add`);
  }

  return (
    <main>
      <section className="section-gap lg:w-3/4 mx-auto">
        <div className="container">
          <Link
            href={`${routes.menuItems}?pageNumber=1`}
            className="flex items-center gap-2 mb-20 bg-red-500 text-white text-base rounded-full w-fit py-2 px-3"
          >
            <HiOutlineArrowCircleLeft className="text-xl rtl:rotate-180" />
            {t("backToProducts")}
          </Link>

          <h1 className="text-red-500 text-center font-bold text-4xl italic mb-10">
            {t("addProduct.title")}
          </h1>

          <AddProductForm categories={categories} />
        </div>
      </section>
    </main>
  );
};

export default AddProductPage;
