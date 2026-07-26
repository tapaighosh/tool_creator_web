import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Tool Creator — Custom AI Agents & Automation Solutions",
    template: "%s | AI Tool Creator",
  },
  description:
    "We build custom AI agents and automation solutions that transform your business. From WhatsApp bots to enterprise-grade AI pipelines — delivered in days, not months.",
  keywords: [
    "AI agents",
    "automation solutions",
    "custom AI",
    "chatbot development",
    "AI tool creator",
    "business automation",
    "WhatsApp bot",
    "AI workflow",
  ],
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  ),
  openGraph: {
    title: "AI Tool Creator — Custom AI Agents & Automation Solutions",
    description:
      "We build custom AI agents and automation solutions that transform your business.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Tool Creator — Custom AI Agents & Automation Solutions",
    description:
      "We build custom AI agents and automation solutions that transform your business.",
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${inter.variable} ${spaceGrotesk.variable} h-full dark`}
    >
      <body className="min-h-full flex flex-col antialiased bg-background text-text-primary font-sans">
        {children}
      </body>
    </html>
  );
}
