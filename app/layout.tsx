import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "./globals.css";
import { NavigationMenuDemo } from "./_components/Navbar/Navbar";
import { FooterTop } from "./_components/Footer/FooterTop";
import Footer from "./_components/Footer/Footer";
import { Toaster } from "@/components/ui/sonner";
import WrapperCom from "./_components/WrapperCom";
import TansTackProvider from "./providers/TansTackProvider";
import AuthProvider from "./providers/AuthProvider";
import { Suspense } from "react";
import Loading from "./_components/Loading/Loading";

const exo = Exo({
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "FreshCart",
  description: "FreshCart Ecommerce",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${exo.className}`}>
        <AuthProvider>
          <TansTackProvider>
            <Suspense fallback={<Loading />}>
              <WrapperCom>
                <NavigationMenuDemo />
              </WrapperCom>

              <main className="pt-[75px] md:pt-[120px]">{children}</main>
            </Suspense>

            <Toaster />

            <FooterTop />
            <Footer />
          </TansTackProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
