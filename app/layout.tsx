import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import NavBar from "./components/nav/NavBar";
import Footer from "./components/footer/Footer";
import CartProvider from "@/providers/CartProvider";
import { Toaster } from "react-hot-toast";
import { AuthContextProvider } from "@/providers/AuthProvider";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700", "900"] });

export const metadata: Metadata = {
  title: "Tier One",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <AuthContextProvider>
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: "rgb(68 64 60)",
                color: "#fff",
              },
              iconTheme: {
                primary: "rgb(14 165 233)",
                secondary: "white",
              },
            },
            error: {
              style: {
                background: "rgb(68 64 60)",
                color: "#fff"
              },
            },
          }}
        />
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow bg-[#5f7f7]-100">{children}</main>
            <Footer />
          </div>
        </CartProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
