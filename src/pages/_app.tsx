import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { useEffect } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import Header from "~/components/Layout/Header";
import Footer from "~/components/Layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    const user = JSON.parse(getCookie("userDetails") || "{}");
    const token = getCookie("token");

    if (!token || !user?.email) {
      void router.push("/login");
    }
  }, []);

  return (
    <main className={`font-sans ${inter.variable}`}>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </main>
  );
};

export default api.withTRPC(MyApp);
