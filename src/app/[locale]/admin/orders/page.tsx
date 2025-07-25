import AdminTable from "@/components/AdminTable";
import { getOrders } from "@/server/db/orders";
import prisma from "@/utils/db";
import { getTranslations } from "next-intl/server";

interface OrdersPageProps {
  searchParams: Promise<{ pageNumber: string }>;
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { pageNumber } = await searchParams;
  const orders = await getOrders(parseInt(pageNumber || "1"));
  const count = await prisma.order.count();
  const t = await getTranslations("admin.orders.table");

  const columns = [
    { key: "userName", name: t("userName") },
    { key: "email", name: t("email") },
    { key: "amount", name: t("amount") },
    { key: "createdAt", name: t("createdAt") },
    { key: "updatedAt", name: t("updatedAt") },
  ];

  return (
    <AdminTable
      data={orders}
      columns={columns}
      pageNumber={String(pageNumber)}
      totalCount={count}
      type="orders"
    />
  );
};

export default OrdersPage;
