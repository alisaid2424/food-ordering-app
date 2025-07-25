"use client";

import { Link, usePathname } from "@/i18n/navigation";
import routes from "@/utils/routes";
import { useTranslations } from "next-intl";

const AdminTabs = () => {
  const t = useTranslations("admin.tabs");
  const pathname = usePathname();

  const tabs = [
    {
      id: crypto.randomUUID(),
      title: t("profile"),
      href: routes.admin,
    },
    {
      id: crypto.randomUUID(),
      title: t("categories"),
      href: routes.categories,
    },
    {
      id: crypto.randomUUID(),
      title: t("menuItems"),
      href: routes.menuItems,
    },
    {
      id: crypto.randomUUID(),
      title: t("users"),
      href: routes.users,
    },
    {
      id: crypto.randomUUID(),
      title: t("orders"),
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
