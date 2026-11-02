import type { Metadata } from "next";
import "./globals.css";
import { Bebas_Neue } from "next/font/google";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas-neue",
  display: "swap",
  fallback: ["Impact", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.theeverydayuniversity.com"),
  title: {
    default: "The Everyday University | Official Podcast & Media Network",
    template: "%s | The Everyday University",
  },
  description:
    "Their stories are our classrooms. The Everyday University is a raw, inspiring podcast network exploring real journeys, struggles, and life-shaping lessons.",
  keywords: [
    "The Everyday University",
    "Everyday University Podcast",
    "Dasi Podcast",
    "Life Lessons",
    "Entrepreneurship Stories",
    "Inspirational Interviews",
    "Podcast Network",
    "Classrooms Without Walls",
  ],
  authors: [{ name: "Dasi", url: "https://www.theeverydayuniversity.com" }],
  creator: "The Everyday University",
  publisher: "The Everyday University",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.theeverydayuniversity.com",
    siteName: "The Everyday University",
    title: "The Everyday University | Official Podcast & Media Network",
    description:
      "Their stories are our classrooms. Exploring authentic life lessons, entrepreneurship journeys, and transformative conversations.",
    images: [
      {
        url: "/dasi-cutout-preview.png",
        width: 800,
        height: 800,
        type: "image/png",
        alt: "The Everyday University - Dasi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Everyday University | Official Podcast & Media Network",
    description:
      "Their stories are our classrooms. Exploring authentic life lessons and transformative conversations.",
    creator: "@everydayunivers",
    images: ["/dasi-cutout-preview.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/dasi-cutout-preview.png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: ["/dasi-cutout-preview.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.theeverydayuniversity.com/#website",
      "url": "https://www.theeverydayuniversity.com",
      "name": "The Everyday University",
      "description": "Their stories are our classrooms. Official podcast and media network.",
      "publisher": {
        "@id": "https://www.theeverydayuniversity.com/#organization",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://www.theeverydayuniversity.com/#organization",
      "name": "The Everyday University",
      "url": "https://www.theeverydayuniversity.com",
      "logo": "https://www.theeverydayuniversity.com/dasi-cutout-preview.png",
      "sameAs": [
        "https://www.youtube.com/@TheEverydayUniversity",
        "https://open.spotify.com/show/1vLkx0lHA6eOtqFjiOKRR1",
        "https://www.instagram.com/theeverydayuniversity",
        "https://www.tiktok.com/@the.everyday.univ",
        "https://x.com/everydayunivers",
        "https://www.facebook.com/people/The-Everyday-University/61574664033182/"
      ],
    },
    {
      "@type": "PodcastSeries",
      "@id": "https://www.theeverydayuniversity.com/#podcast",
      "name": "The Everyday University",
      "url": "https://www.theeverydayuniversity.com",
      "description": "Their stories are our classrooms. A podcast exploring raw human journeys, struggles, and life lessons.",
      "author": {
        "@type": "Person",
        "name": "Dasi",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-black text-white selection:bg-[#facc15] selection:text-black">
        {children}
      </body>
    </html>
  );
}
