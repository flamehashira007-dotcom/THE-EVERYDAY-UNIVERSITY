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
  metadataBase: new URL("https://theeverydayuniversity.com"),
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
  authors: [{ name: "Dasi", url: "https://theeverydayuniversity.com" }],
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
    url: "https://theeverydayuniversity.com",
    siteName: "The Everyday University",
    title: "The Everyday University | Official Podcast & Media Network",
    description:
      "Their stories are our classrooms. Exploring authentic life lessons, entrepreneurship journeys, and transformative conversations.",
    images: [
      {
        url: "/dasi.png",
        width: 1200,
        height: 630,
        alt: "The Everyday University - Official Podcast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Everyday University | Official Podcast & Media Network",
    description:
      "Their stories are our classrooms. Exploring authentic life lessons and transformative conversations.",
    creator: "@everydayunivers",
    images: ["/dasi.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/The Everyday University LOGO2.ico" },
    ],
    shortcut: ["/favicon.ico"],
    apple: ["/The Everyday University LOGO2.ico"],
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
      "@id": "https://theeverydayuniversity.com/#website",
      "url": "https://theeverydayuniversity.com",
      "name": "The Everyday University",
      "description": "Their stories are our classrooms. Official podcast and media network.",
      "publisher": {
        "@id": "https://theeverydayuniversity.com/#organization",
      },
    },
    {
      "@type": "Organization",
      "@id": "https://theeverydayuniversity.com/#organization",
      "name": "The Everyday University",
      "url": "https://theeverydayuniversity.com",
      "logo": "https://theeverydayuniversity.com/dasi.png",
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
      "@id": "https://theeverydayuniversity.com/#podcast",
      "name": "The Everyday University",
      "url": "https://theeverydayuniversity.com",
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
