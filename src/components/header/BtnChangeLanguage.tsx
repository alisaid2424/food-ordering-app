"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";

const languages = [
  { code: "en", label: "English (EN)" },
  { code: "ar", label: "العربية (AR)" },
];

const BtnChangeLanguage = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const toggleMenu = () => setOpen(!open);

  const changeLanguage = (lng: string) => {
    const urlParams = new URLSearchParams(window.location.search);
    const pageNumber = urlParams.get("pageNumber");
    const path = pathname?.replace(`/${locale}`, `/${lng}`) ?? `/${lng}`;

    const queryString = pageNumber ? `?pageNumber=${pageNumber}` : "";

    router.push(`${path}${queryString}`);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="hidden sm:block " ref={menuRef}>
      <div className="relative z-50">
        <button
          onClick={toggleMenu}
          className="flex size-9 items-center justify-center rounded-full hover:bg-red-500 hover:shadow-md transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="23"
            viewBox="0 0 23 23"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500 hover:text-white transition-all duration-300 text-xl"
          >
            <path d="m5 8 6 6" />
            <path d="m4 14 6-6 2-3" />
            <path d="M2 5h12" />
            <path d="M7 2h1" />
            <path d="m22 22-5-10-5 10" />
            <path d="M14 18h6" />
          </svg>
        </button>

        {open && (
          <div className="absolute mt-2 end-0 w-36 bg-white border border-gray-100 rounded-lg shadow-xl overflow-hidden">
            {languages.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => changeLanguage(code)}
                className={`flex w-full px-4 py-2 text-sm items-center justify-end transition-colors duration-150 ${
                  locale === code
                    ? "bg-red-500/10 text-red-500 font-medium"
                    : "text-gray-700 hover:bg-red-500/10 hover:text-red-500"
                }`}
              >
                {locale === code && (
                  <span className="bg-red-500 ms-2 size-2 rounded-full shadow shadow-red-500/50"></span>
                )}
                <span className="ms-4">{label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BtnChangeLanguage;
