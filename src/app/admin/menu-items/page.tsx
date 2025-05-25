import { getProducts } from "@/server/db/products";
import prisma from "@/utils/db";
import AdminTable from "@/components/AdminTable";

interface MenuItemsPageProps {
  searchParams: Promise<{ pageNumber: string }>;
}
const MenuItemsPage = async ({ searchParams }: MenuItemsPageProps) => {
  const { pageNumber } = await searchParams;
  const page = Number(pageNumber) || 1;
  const products = await getProducts(page);
  const count: number = await prisma.product.count();

  const columns = [
    { key: "name", name: "Name" },
    { key: "description", name: "Description" },
    { key: "image", name: "Image" },
    { key: "createdAt", name: "CreatedAt" },
    { key: "updatedAt", name: "UpdatedAt" },
  ];

  return (
    <AdminTable
      data={products}
      columns={columns}
      pageNumber={pageNumber}
      totalCount={count}
      type="menu-items"
    />
  );
};

export default MenuItemsPage;
