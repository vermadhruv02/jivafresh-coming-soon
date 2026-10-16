import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Hind } from "next/font/google";
import "./globals.css";

// Width axis drives the dry -> wet type morph.
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
});

const hind = Hind({
  variable: "--font-hind",
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600"],
});

const TITLE = "JivaFresh · Ready-to-eat Jain meals, coming soon";
const DESCRIPTION =
  "JivaFresh is coming soon: ready-to-eat Jain meals with no onion, no garlic and no root vegetables. Ghar jaisa swaad. Add hot water, wait a few minutes, eat.";

export const metadata: Metadata = {
  metadataBase: new URL("https://jivafresh.com"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { siteName: "JivaFresh", locale: "en_IN", type: "website", url: "/", title: TITLE, description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: TITLE, description: DESCRIPTION },
};

export const viewport: Viewport = { themeColor: "#f2f6f4" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${bricolage.variable} ${hind.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
