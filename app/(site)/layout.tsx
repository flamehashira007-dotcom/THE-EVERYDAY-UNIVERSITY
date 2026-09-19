import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import IntroLoader from "@/components/IntroLoader";
import { IntroProvider } from "@/context/IntroContext";
import Footer from "@/components/Footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <IntroProvider>
      <IntroLoader />
      <SmoothScroll>
        <Navbar />
        {children}
        <Footer />
      </SmoothScroll>
    </IntroProvider>
  );
}
