import { getProducts } from "@/server/db/products";
import prisma from "@/utils/db";
import AdminTable from "@/components/AdminTable";
import { getTranslations } from "next-intl/server";

interface MenuItemsPageProps {
  searchParams: Promise<{ pageNumber: string }>;
}
const MenuItemsPage = async ({ searchParams }: MenuItemsPageProps) => {
  const t = await getTranslations("admin.menu-items.table");
  const { pageNumber } = await searchParams;
  const page = Number(pageNumber) || 1;
  const products = await getProducts(page);
  const count: number = await prisma.product.count();

  const columns = [
    { key: "name", name: t("name") },
    { key: "description", name: t("description") },
    { key: "image", name: t("image") },
    { key: "createdAt", name: t("createdAt") },
    { key: "updatedAt", name: t("updatedAt") },
  ];

  return (
    <AdminTable
      data={products}
      columns={columns}
      pageNumber={pageNumber}
      totalCount={count}
      type="menuItems"
    />
  );
};

export default MenuItemsPage;
