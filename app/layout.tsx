import type { Metadata } from "next";
import { Rajdhani, DM_Sans } from "next/font/google";
import "./globals.css";

import BackgroundController from "@/components/background/BackgroundController";
import Header from "@/components/layout/Header";
import StatusBar from "@/components/layout/StatusBar";
import MotionProvider from "@/components/layout/MotionProvider";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rabih.app"),
  title: {
    default: "Rabih Siddiqui",
    template: "%s | Rabih Siddiqui",
  },
  description:
    "Cognitive Scientist and product-focused developer. Designing and building thoughtful interfaces.",
  alternates: {
    canonical: "https://rabih.app",
  },
  openGraph: {
    title: "Rabih Siddiqui",
    description:
      "Cognitive Scientist and product-focused developer. Designing and building thoughtful interfaces.",
    url: "https://rabih.app",
    siteName: "rabih.app",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rabih Siddiqui",
    description:
      "Cognitive Scientist and product-focused developer. Designing and building thoughtful interfaces.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
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
      className={`${rajdhani.variable} ${dmSans.variable} h-full`}
    >
      <body className="h-full overflow-hidden antialiased">
        <MotionProvider>
          {/* Skip-to-content: first tab stop, jumps over persistent chrome */}
          <a href="#main-content" className="skip-to-content">
            SKIP TO CONTENT
          </a>

          {/* Layer 0: full-viewport animated background */}
          <BackgroundController />

          {/* Layer 1: persistent chrome */}
          <Header />
          <StatusBar />

          {/* Layer 2: page content */}
          <div
            id="main-content"
            className="relative z-10 h-full"
            style={{
              paddingTop: "var(--header-height)",
              paddingBottom: "var(--status-height)",
            }}
          >
            {children}
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
