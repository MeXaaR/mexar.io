import type { Metadata } from "next";
import "./globals.css";
import { Teko, Rubik } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <head>
        <link
          rel="shortcut icon"
          href="favicon.ico"
          id="fav-shortcut"
          type="image/x-icon"
        />
        <link rel="icon" href="favicon.ico" id="fav-icon" type="image/x-icon" />
        <link rel="icon" href="favicon.ico" />
        {/* Titre de la page */}
        <title>
          mexar.io - Bundle of small, useful tools for developers and designers
        </title>
        {/* Description de la page */}
        <meta
          name="description"
          content="Discover these useful tools for developers and designers. Free tools for everyone. Forever"
        />
        {/* Balises Open Graph pour les réseaux sociaux */}
        <meta
          property="og:title"
          content="Mexar.io - Bundle of small, useful tools for developers and designers"
        />
        <meta
          property="og:description"
          content="Discover these useful tools for developers and designers. Free tools for everyone. Forever"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mexar.io" />
        <meta
          property="og:image"
          content="https://mexar.io/images/logo-dark.png"
        />{" "}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Mexar.io - Bundle of small, useful tools for developers and designers"
        />
        <meta
          name="twitter:description"
          content="Discover these useful tools for developers and designers. Free tools for everyone. Forever"
        />
        <meta
          name="twitter:image"
          content="https://mexar.io/images/logo-dark.png"
        />{" "}
        <link rel="canonical" href="https://mexar.io" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="English" />
        <meta name="author" content="François AUBEUT" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="apple-mobile-web-app-title" content="Mexar.io" />
        <meta name="application-name" content="Mexar" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body>{children}</body>
      <ToastContainer />
    </html>
  );
}
