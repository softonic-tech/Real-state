import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import BuyerGuideContent from "@/components/pages/BuyerGuideContent";

export const metadata: Metadata = {
  title: "Hur man köper",
  description:
    "Steg-för-steg guide till att köpa bostäder och fastigheter i norra Sverige.",
};

export default function HurManKoperPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader
          title="Hur man köper"
          subtitle="En tydlig och trygg process från första kontakt till tillträde."
          label="Köpguide"
        />
        <BuyerGuideContent />
      </main>
      <Footer />
    </>
  );
}
