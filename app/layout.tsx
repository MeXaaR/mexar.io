import type { Metadata } from "next";
import "./globals.css";
import { Teko, Rubik } from "next/font/google";
export const metadata: Metadata = {
  title: "mexar.io",
  description: "Bundle of free tools for everyone",
};

const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
});
const teko = Teko({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rubik.className} ${teko.className}`}>
      <body>{children}</body>
    </html>
  );
}
