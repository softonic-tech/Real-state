import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { getSiteUrl } from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Olofssons Skog & Mäkleri | Bostäder till salu",
    template: "%s | Olofssons Skog & Mäkleri",
  },
  description:
    "Bostäder till salu i Junsele och omnejd. Fastighetsmäkleri och rådgivning för jord- och skogsfastigheter — Ingemar Olofsson, fastighetsmäklare.",
  keywords: [
    "bostäder till salu",
    "fastighetsmäklare",
    "Junsele",
    "Sollefteå",
    "jord- och skogsfastigheter",
    "fastighetsförmedling",
    "värdering",
  ],
  openGraph: {
    type: "website",
    locale: "sv_SE",
    siteName: "Olofssons Skog & Mäkleri",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    google: "notranslate",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv" translate="no">
      <body className="min-h-screen flex flex-col">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#2c2c2c",
              color: "#f8f6f0",
              fontFamily: "DM Sans, system-ui, sans-serif",
              fontSize: "0.875rem",
              borderRadius: "0",
              padding: "14px 20px",
            },
          }}
        />
      </body>
    </html>
  );
}
