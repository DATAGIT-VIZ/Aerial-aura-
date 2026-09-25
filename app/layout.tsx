import type { Metadata } from "next";
import { Big_Shoulders, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
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
      className={`${bigShoulders.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
