import type { Metadata } from "next";
import { Cormorant, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import CustomCursor   from "@/components/CustomCursor";
import RevealOnScroll from "@/components/RevealOnScroll";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aerial Aura — Aerial Cinematography",
  description:
    "FPV & cinematic drone films for weddings, real estate and brands — shot, graded and delivered by a former chef who traded the pass for a controller. Based in Switzerland.",
  openGraph: {
    title: "Aerial Aura — Aerial Cinematography",
    description:
      "FPV & cinematic drone films for weddings, real estate and brands. Based in Switzerland.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <CustomCursor />
        <RevealOnScroll />
        {children}
      </body>
    </html>
  );
}
