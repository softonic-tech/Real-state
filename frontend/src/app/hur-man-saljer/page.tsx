import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import SellerGuideContent from "@/components/pages/SellerGuideContent";

export const metadata: Metadata = {
  title: "Hur man säljer",
  description:
    "Professionell förmedling och värdering av bostäder och fastigheter.",
};

export default function HurManSaljerPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader
          title="Hur man säljer"
          subtitle="Professionell förmedling som maximerar värdet på din fastighet."
          label="Säljguide"
        />
        <SellerGuideContent />
      </main>
      <Footer />
    </>
  );
}
