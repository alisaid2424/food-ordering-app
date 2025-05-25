import { FC } from "react";
import Link from "next/link";
import {
  CATEGORIES_PER_PAGE,
  ORDERS_PER_PAGE,
  PRODUCTS_PER_PAGE,
  USERS_PER_PAGE,
} from "@/utils/constants";
import Image from "next/image";
import { FiEdit } from "react-icons/fi";
import { TbListDetails } from "react-icons/tb";
import { UserRole } from "@prisma/client";
import DeleteUserButton from "@/app/admin/users/DeleteUserButton";
import DeleteCategoryButton from "@/app/admin/categories/DeleteCategoryButton";
import DeleteProductButton from "@/app/admin/menu-items/DeleteProductButton";
import Pagination from "./Pagination";
import DeleteOrderButton from "@/app/admin/orders/_components/DeleteOrderButton";
import LottieHandler from "@/utils/LottieHandler";

interface AdminTableProps {
  data: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  columns: Array<{ key: string; name: string }>;
  pageNumber: string;
  totalCount: number;
  type: "users" | "categories" | "menu-items" | "orders";
}

const AdminTable: FC<AdminTableProps> = ({
  data,
  columns,
  pageNumber,
  totalCount,
  type,
}) => {
  const pages =
    type === "users"
      ? Math.ceil(totalCount / USERS_PER_PAGE)
      : type === "categories"
        ? Math.ceil(totalCount / CATEGORIES_PER_PAGE)
        : type === "menu-items"
          ? Math.ceil(totalCount / PRODUCTS_PER_PAGE)
          : Math.ceil(totalCount / ORDERS_PER_PAGE);

  return (
    <main>
      <section className="section-gap lg:w-3/4 mx-auto">
        <div className="container">
          {type !== "orders" && (
            <div className="mb-10">
              <Link
                href={`/admin/${type}/add`}
                className="bg-gray-500 hover:bg-green-600 transition-colors py-2 px-3 rounded-md font-semibold text-lg 
                  text-white"
              >
                {type === "users"
                  ? "Create User"
                  : type === "categories"
                    ? "Create Category"
                    : type === "menu-items"
                      ? "Create Product"
                      : null}
              </Link>
            </div>
          )}

          {data.length > 0 ? (
            <>
              <table className="table text-center w-full mt-5 ">
                <thead className="border-t-2 border-b-2 border-gray-800 text-lg">
                  <tr>
                    <th className="p-3">#</th>

                    {columns.map((column) => (
                      <th
                        key={column.key}
                        className={`p-3 ${
                          column.key === "createdAt" ||
                          column.key === "updatedAt" ||
                          column.key === "image"
                            ? "hidden lg:table-cell p-3 text-center align-middle"
                            : ""
                        }`}
                      >
                        {column.name}
                      </th>
                    ))}
                    <th className="p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-500 odd:bg-gray-50 even:bg-white hover:bg-gray-100 transition-colors"
                    >
                      <td className="p-3">{index + 1}</td>
                      {columns.map((column) => {
                        const value = item[column.key];

                        if (column.key === "image") {
                          return (
                            <td
                              key={column.key}
                              className="hidden md:table-cell p-3 text-center align-middle"
                            >
                              {value ? (
                                <Image
                                  src={value}
                                  alt={item.name}
                                  width={50}
                                  height={50}
                                  className="object-cover rounded-full mx-auto"
                                />
                              ) : null}
                            </td>
                          );
                        }

                        if (
                          column.key === "createdAt" ||
                          column.key === "updatedAt"
                        ) {
                          return (
                            <td
                              key={column.key}
                              className="hidden lg:table-cell p-3 text-center align-middle"
                            >
                              {new Date(value).toDateString()}
                            </td>
                          );
                        }

                        return (
                          <td key={column.key} className="p-3">
                            {value}
                          </td>
                        );
                      })}

                      <td>
                        <div className="flex items-center justify-center gap-2 md:gap-3">
                          {type !== "orders" ? (
                            <Link
                              href={`/admin/${type}/${item.id}/edit`}
                              className="bg-green-600 text-white rounded-lg p-2 hover:bg-green-800 transition-all duration-300 inline-block"
                            >
                              <FiEdit className="text-xl" />
                            </Link>
                          ) : (
                            <Link
                              href={`/admin/${type}/${item.id}`}
                              className="bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-800 transition-all duration-300 inline-block"
                            >
                              <TbListDetails className="text-xl" />
                            </Link>
                          )}

                          {type === "users" ? (
                            item.role !== UserRole.ADMIN && (
                              <DeleteUserButton userId={item.id} />
                            )
                          ) : type === "categories" ? (
                            <DeleteCategoryButton categoryId={item.id} />
                          ) : type === "menu-items" ? (
                            <DeleteProductButton productId={item.id} />
                          ) : (
                            <DeleteOrderButton orderId={item.id} />
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <Pagination
                pageNumber={parseInt(pageNumber)}
                pages={pages}
                route={`/admin/${type}`}
              />
            </>
          ) : (
            <div className="flex items-center justify-center flex-col text-center">
              <LottieHandler type="empty" message={`No ${type} found`} />
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default AdminTable;
