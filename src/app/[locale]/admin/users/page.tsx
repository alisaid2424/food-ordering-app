import { getUsers } from "@/server/db/users";
import prisma from "@/utils/db";
import AdminTable from "@/components/AdminTable";
import { getTranslations } from "next-intl/server";

interface UsersPageProps {
  searchParams: Promise<{ pageNumber: string }>;
}

const UsersPage = async ({ searchParams }: UsersPageProps) => {
  const { pageNumber } = await searchParams;
  const page = Number(pageNumber) || 1;
  const users = await getUsers(page);
  const count: number = await prisma.user.count();
  const t = await getTranslations("admin.users.table");

  const columns = [
    { key: "name", name: t("name") },
    { key: "email", name: t("email") },
    { key: "image", name: t("image") },
    { key: "createdAt", name: t("createdAt") },
    { key: "updatedAt", name: t("updatedAt") },
  ];

  return (
    <AdminTable
      data={users}
      columns={columns}
      pageNumber={pageNumber}
      totalCount={count}
      type="users"
    />
  );
};

export default UsersPage;
