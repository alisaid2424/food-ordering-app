import { getTranslations } from "next-intl/server";

const Footer = async () => {
  const t = await getTranslations();
  return (
    <footer className="flex items-center justify-center text-sm sm:text-base py-3 text-black bg-white bg-opacity-75 h-[50px] shadow-top-md">
      &copy; {new Date().getFullYear()} {t("copyRight")}
    </footer>
  );
};

export default Footer;
