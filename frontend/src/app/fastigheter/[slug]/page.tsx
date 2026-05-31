import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PropertyDetailView from "@/components/property/PropertyDetailView";
import RecommendedProperties from "@/components/property/RecommendedProperties";
import { propertyService } from "@/services/property.service";
import { SITE_NAME } from "@/constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Always fetch fresh property data from the API (no static cache). */
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const res = await propertyService.getBySlug(slug);

  if (!res.success || !res.data) {
    return { title: "Fastighet hittades inte" };
  }

  const property = res.data;
  return {
    title: property.title,
    description: property.description.slice(0, 160),
    openGraph: {
      title: `${property.title} | ${SITE_NAME}`,
      description: property.description.slice(0, 160),
      images: property.images[0] ? [{ url: property.images[0] }] : [],
    },
  };
}

export default async function PropertyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const res = await propertyService.getBySlug(slug);

  if (!res.success || !res.data) {
    notFound();
  }

  const property = res.data;
  const recommendedRes = await propertyService.getRecommended(property);
  const recommended = recommendedRes.data ?? [];

  return (
    <>
      <Header />
      <main>
        <PropertyDetailView property={property} />
        <RecommendedProperties properties={recommended} city={property.city} />
      </main>
      <Footer />
    </>
  );
}
