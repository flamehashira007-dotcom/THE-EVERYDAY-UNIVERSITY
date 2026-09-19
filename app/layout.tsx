import type { Metadata } from "next";
import "./globals.css";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
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
        {children}
      </body>
    </html>
  );
}
