import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function PropertyNotFound() {
  return (
    <>
      <Header />
      <main className="inner-page-section min-h-[50vh] flex items-center">
        <div className="section-padding page-container text-center w-full">
          <h1 className="text-display-sm text-charcoal mb-3">
            Fastigheten hittades inte
          </h1>
          <p className="text-stone-500 font-body mb-8">
            Annonsen kan ha tagits bort eller adressen är felaktig.
          </p>
          <Link href="/fastigheter" className="btn-primary">
            Till alla fastigheter
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
