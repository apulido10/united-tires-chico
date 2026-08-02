import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://unitedtireschico.com"),
  title: {
    default: "United Tires and Wheels — Chico, CA",
    template: "%s · United Tires and Wheels",
  },
  description:
    "New and used tires, wheels, alignment, brakes, suspension, and oil changes in Chico, CA. Straight prices, walk-ins welcome. Call (530) 809-1976.",
  keywords: [
    "tires Chico",
    "tire shop Chico",
    "used tires Chico",
    "wheel alignment Chico",
    "brake repair Chico",
    "oil change Chico",
    "United Tires and Wheels",
  ],
  openGraph: {
    title: "United Tires and Wheels — Chico, CA",
    description:
      "New and used tires, wheels, alignment, brakes, and oil changes in Chico. Straight prices, walk-ins welcome.",
    url: "https://unitedtireschico.com",
    siteName: "United Tires and Wheels",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "United Tires and Wheels — Chico, CA",
    description:
      "New and used tires, wheels, alignment, brakes, and oil changes in Chico. Straight prices, walk-ins welcome.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
