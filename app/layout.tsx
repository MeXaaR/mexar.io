import type { Metadata } from "next";
import "./globals.css";
import { Teko, Rubik } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://mexar.io"),
  title: {
    default: "mexar.io - Bundle of free tools for developers and designers",
    template: "%s | mexar.io",
  },
  description:
    "Discover these useful tools for developers and designers. Free tools for everyone. Forever",
  keywords: [
    "developer tools",
    "online tools",
    "web development",
    "code formatter",
    "JSON formatter",
    "CSS formatter",
    "HTML formatter",
    "color converter",
    "base64 converter",
    "JWT debugger",
    "free tools",
    "mexar.io",
  ],
  authors: [{ name: "François AUBEUT" }],
  creator: "François AUBEUT",
  publisher: "mexar.fr",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mexar.io",
    siteName: "mexar.io",
    title:
      "Mexar.io - Bundle of small, useful tools for developers and designers",
    description:
      "Discover these useful tools for developers and designers. Free tools for everyone. Forever",
    images: [
      {
        url: "https://mexar.io/images/logo-dark.png",
        width: 1200,
        height: 630,
        alt: "mexar.io Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Mexar.io - Bundle of small, useful tools for developers and designers",
    description:
      "Discover these useful tools for developers and designers. Free tools for everyone. Forever",
    creator: "@MeXaaR",
    images: ["https://mexar.io/images/logo-dark.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/images/logo_dark.png", type: "image/png" }],
    other: [
      {
        rel: "apple-touch-icon",
        url: "/images/logo_dark.png",
      },
    ],
  },
  manifest: "/manifest.json",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    // google: "your-google-site-verification",
    // yandex: "your-yandex-verification",
    // yahoo: "your-yahoo-verification",
    other: {
      me: ["https://mexar.fr"],
    },
  },
  category: "technology",
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
      <body>
        {children}
        <ToastContainer />
        <Analytics />
      </body>
    </html>
  );
}
