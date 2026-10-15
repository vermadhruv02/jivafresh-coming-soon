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

const DESCRIPTION =
  "JivaFresh is coming soon. Ready-to-eat dehydrated Indian meals: dal makhani, rajma, chole, khichdi, poha and more. Add hot water, wait a few minutes, eat.";

export const metadata: Metadata = {
  metadataBase: new URL("https://jivafresh.com"),
  title: "JivaFresh · Coming soon",
  description: DESCRIPTION,
  openGraph: { siteName: "JivaFresh", locale: "en_IN", type: "website", url: "/", title: "JivaFresh · Coming soon", description: DESCRIPTION },
  twitter: { card: "summary_large_image", title: "JivaFresh · Coming soon", description: DESCRIPTION },
};

export const viewport: Viewport = { themeColor: "#f2f6f4" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${bricolage.variable} ${hind.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
