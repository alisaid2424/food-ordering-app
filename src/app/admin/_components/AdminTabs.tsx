"use client";

import routes from "@/utils/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminTabs = () => {
  const pathname = usePathname();

  const tabs = [
    {
      id: crypto.randomUUID(),
      title: "Profile",
      href: routes.admin,
    },
    {
      id: crypto.randomUUID(),
      title: "Categories",
      href: routes.categories,
    },
    {
      id: crypto.randomUUID(),
      title: "Menu Items",
      href: routes.menuItems,
    },
    {
      id: crypto.randomUUID(),
      title: "Users",
      href: routes.users,
    },
    {
      id: crypto.randomUUID(),
      title: "Orders",
      href: routes.orders,
    },
  ];

  const isActiveTab = (href: string) => {
    const hrefArray = href.split("/");
    return hrefArray.length > 2 ? pathname.startsWith(href) : pathname === href;
  };

  return (
    <nav className="mt-10">
      <ul className="flex items-center flex-wrap gap-5 justify-center">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <Link
              href={`${tab.href}?pageNumber=1`}
              className={`font-semibold rounded-md px-3 py-2 ${
                isActiveTab(tab.href)
                  ? "text-white bg-red-500"
                  : "text-black hover:text-white hover:bg-gray-500"
              }`}
            >
              {tab.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default AdminTabs;
