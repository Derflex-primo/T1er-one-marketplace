import "./globals.css";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Michroma, Roboto } from "next/font/google";
import NavBar from "./components/nav-ui/page";
import Footer from "./components/footer-ui/Footer";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";
import { initializeApp } from "firebase/app";
import AuthRouteProvider from "@/providers/AuthRouteProvider";
import ProductProvider from "@/providers/ProductProvider";
import { config } from "@/lib/db/firebaseUtils";
import NextTopLoader from "nextjs-toploader";
import { Theme } from "@radix-ui/themes";
import PinnedProvider from "@/providers/PinnnedProvider";

const Firebase = initializeApp(config.firebaseConfig);

const michroma = Michroma({ subsets: ["latin"], weight: "400" });

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700", "900"] });

export const metadata: Metadata = {
  title: "Tier One Marketplace",
  description: "A marketplace based on the philippines",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${roboto.className}${michroma.className}`}>
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: "rgb(68 64 60)",
                color: "#fff",
              },
              iconTheme: {
                primary: "rgb(227 27 54)",
                secondary: "white",
              },
            },
            error: {
              style: {
                background: "rgb(68 64 60)",
                color: "#fff",
              },
            },
          }}
        />
        <Theme>
          <ProductProvider>
            <AuthRouteProvider>
              <CartProvider>
                <PinnedProvider>
                  <div className="flex flex-col min-h-screen">
                    <NextTopLoader color="#fc0335" showSpinner={false} />
                    <NavBar />
                    <main className="flex-grow bg-[#5f7f7]-100">
                      {children}
                    </main>
                    <Footer />
                  </div>
                </PinnedProvider>
              </CartProvider>
            </AuthRouteProvider>
          </ProductProvider>
        </Theme>
      </body>
    </html>
  );
}
