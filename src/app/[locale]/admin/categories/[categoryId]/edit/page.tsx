import { notFound } from "next/navigation";
import EditCategoryForm from "./EditCategoryForm";
import { getCategory } from "@/server/db/categories";
import { HiOutlineArrowCircleLeft } from "react-icons/hi";
import routes from "@/utils/routes";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type PageProps = {
  params: Promise<{
    categoryId: string;
  }>;
};

const EditCategoryPage = async ({ params }: PageProps) => {
  const t = await getTranslations("admin.categories.editCategory");
  const { categoryId } = await params;
  const category = await getCategory(categoryId);

  if (!category) notFound();

  return (
    <main>
      <section className="section-gap lg:w-3/4 mx-auto">
        <div className="container">
          <Link
            href={`${routes.categories}?pageNumber=1`}
            className="flex items-center gap-2 mb-20 bg-red-500 text-white text-base rounded-full w-fit py-2 px-3"
          >
            <HiOutlineArrowCircleLeft className="text-xl rtl:rotate-180" />{" "}
            {t("form.back")}
          </Link>

          <h1 className="text-red-500 text-center font-bold text-4xl italic mb-10">
            {t("title")}
          </h1>

          <EditCategoryForm category={category} />
        </div>
      </section>
    </main>
  );
};

export default EditCategoryPage;
