import type { Metadata } from "next";
import { Cairo, Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

const cairo = Cairo({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Food Ordering App",
  description:
    "The Food Ordering System is a cutting-edge, user-friendly platform designed to simplify the process of ordering food online. Whether you're craving a quick snack, a delicious meal, or a special treat, this system offers a seamless experience for both customers and restaurant owners. With an intuitive interface and easy navigation, customers can browse through menus, select their favorite dishes, customize their orders, and make payments—all from the comfort of their home or on the go",
  icons: {
    icon: "/favicon-32x32.png",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}

export default async  function RootLayout({ children ,  params }: RootLayoutProps) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }


  return (
    <NextAuthSessionProvider>
      <ReduxProvider>
        <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"} >
          <body className={locale === "ar" ? cairo.className : roboto.className}>
            <NextIntlClientProvider>
              <Header />
              <ToastContainer theme="colored" position="top-center" />
              <main className="min-h-[calc(100vh-114px)]">{children}</main>
              <Footer />
            </NextIntlClientProvider>
          </body>
        </html>
      </ReduxProvider>
    </NextAuthSessionProvider>
  );
}
