import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";
import ReduxProvider from "@/providers/ReduxProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <NextAuthSessionProvider>
      <ReduxProvider>
        <html lang="en">
          <body className={roboto.className}>
            <Header />
            <ToastContainer theme="colored" position="top-center" />
            <main className="min-h-[calc(100vh-114px)]">{children}</main>
            <Footer />
          </body>
        </html>
      </ReduxProvider>
    </NextAuthSessionProvider>
  );
}
