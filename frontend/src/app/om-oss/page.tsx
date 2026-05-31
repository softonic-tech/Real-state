import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import OmOssContent from "@/components/pages/OmOssContent";
import { SITE_DESCRIPTION, SITE_NAME } from "@/constants";

export const metadata: Metadata = {
  title: "Om oss",
  description: `Lär känna ${SITE_NAME} – ${SITE_DESCRIPTION}`,
};

export default function OmOssPage() {
  return (
    <>
      <Header />
      <main>
        <PageHeader
          title="Om oss"
          subtitle="Lokal mäklare för bostäder — och rådgivare för jord- och skogsfastigheter."
          label={SITE_NAME}
        />
        <OmOssContent />
      </main>
      <Footer />
    </>
  );
}
