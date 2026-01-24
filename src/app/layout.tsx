import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeuroPath AI - Personalized Learning Engine Powered by Behavior",
  description:
    "NeuroPath AI is an AI-powered personalized learning engine that dynamically adapts educational content based on learner behavior, performance, and engagement signals.",
  keywords: [
    "NeuroPath AI",
    "AI Personalized Learning",
    "Adaptive Learning Engine",
    "EdTech AI",
    "Behavior-Based Learning",
    "AI Education Platform",
    "Personalized Education",
    "Next.js AI App",
  ],
  authors: [{ name: "Uneeb" }],
  creator: "Uneeb",
  openGraph: {
    title: "NeuroPath AI - Adaptive Learning Reimagined",
    description:
      "An intelligent learning engine that personalizes educational content in real time using learner behavior and AI-driven decision making.",
    url: "https://neuropath-ai.vercel.app",
    siteName: "NeuroPath AI",
    images: [
      {
        url: "https://neuropath-ai.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "NeuroPath AI - Personalized Learning Engine",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NeuroPath AI - Intelligence That Learns How You Learn",
    description:
      "AI-powered adaptive learning that evolves with every learner interaction.",
    images: ["https://neuropath-ai.vercel.app/og-image.png"],
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
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
