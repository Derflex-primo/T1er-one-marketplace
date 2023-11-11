import "./globals.css";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import { Michroma, Roboto } from "next/font/google";
import NavBar from "./components/nav-ui/page";
import Footer from "./components/footer-ui/Footer";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";
import ProductProvider from "@/providers/ProductProvider";
import NextTopLoader from "nextjs-toploader";
import { Theme } from "@radix-ui/themes";
import PinnedProvider from "@/providers/PinnnedProvider";
import AuthProvider from "@/providers/AuthRouteProvider";
import { SearchProvider } from "@/providers/SearchContext";
import { LoadingProvider } from "@/providers/LoadingProvider";

const michroma = Michroma({ subsets: ["latin"], weight: "400" });

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700", "900"] });

export const metadata: Metadata = {
  title: "T1er One",
  description: "A marketplace based on the philippines",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
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
            <AuthProvider>
              <LoadingProvider>
                <SearchProvider>
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
                </SearchProvider>
              </LoadingProvider>
            </AuthProvider>
          </ProductProvider>
        </Theme>
      </body>
    </html>
  );
}
