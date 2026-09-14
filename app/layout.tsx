import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import IntroLoader from "@/components/IntroLoader";
import { IntroProvider } from "@/context/IntroContext";
import { Bebas_Neue } from "next/font/google";
import Footer from "@/components/Footer";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400", // Bebas Neue only comes in weight 400
  variable: "--font-bebas-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Everyday University | Official Podcast & Media",
  description: "Their stories are our classrooms. Official podcast and media network.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} antialiased`}>
      <body className="bg-black text-white selection:bg-[#facc15] selection:text-black">
        <IntroProvider>
          <IntroLoader />
          <SmoothScroll>
            <Navbar />
            {children}
            <Footer />
          </SmoothScroll>
        </IntroProvider>
      </body>
    </html>
  );
}

