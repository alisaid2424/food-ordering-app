import { getCategoriesByPagenation } from "@/server/db/categories";
import prisma from "@/utils/db";
import AdminTable from "@/components/AdminTable";
import { getTranslations } from "next-intl/server";

type CategoriesPageProps = {
  searchParams: Promise<{
    pageNumber: string;
  }>;
};

const CategoriesPage = async ({ searchParams }: CategoriesPageProps) => {
  const { pageNumber } = await searchParams;

  const t = await getTranslations("admin.categories.table");

  const categories = await getCategoriesByPagenation(parseInt(pageNumber));
  const count: number = await prisma.category.count();

  const columns = [
    { key: "name", name: t("name") },
    { key: "description", name: t("description") },
    { key: "image", name: t("image") },
    { key: "createdAt", name: t("createdAt") },
    { key: "updatedAt", name: t("updatedAt") },
  ];

  return (
    <AdminTable
      data={categories}
      columns={columns}
      pageNumber={pageNumber}
      totalCount={count}
      type="categories"
    />
  );
};

export default CategoriesPage;
