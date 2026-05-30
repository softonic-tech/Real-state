import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Nordmark Fastigheter | Skogs- & Jordbruksfastigheter i Sverige",
    template: "%s | Nordmark Fastigheter",
  },
  description:
    "Specialister pa jordbruks- och skogsfastigheter i Sverige. Radgivning, formedling och vardering av mark- och skogsfastigheter.",
  keywords: [
    "fastigheter",
    "skogsfastigheter",
    "jordbruksfastigheter",
    "Sverige",
    "fastighetsformedling",
    "skogsmark",
    "lantbruk",
  ],
  openGraph: {
    type: "website",
    locale: "sv_SE",
    siteName: "Nordmark Fastigheter",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sv">
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
